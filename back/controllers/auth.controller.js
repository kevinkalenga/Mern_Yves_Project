import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/errors.js';
import jwt from "jsonwebtoken"

// Api signup(inscription)

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("Creation de l'utilisateur reussie")
    } catch (error) {
        next(error)

    }

}

// Api signin(connexion)

export const signin = async (req, res, next) => {
    // requette concernant la connexion de user
    const { email, password } = req.body

    try {
        // recup l'utilisateur connecter depuis la bdd
        const validUser = await User.findOne({ email });
        // si l utilisateur n existe pas
        if (!validUser) return next(errorHandler(404, "L'Utilisateur non trouvé"));
        //Si il existe on compare les mdp
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        //mdp ne match pas 
        if (!validPassword) return next(errorHandler(401, "Informations d'identification erronées!"));
        // si c'est ok on crée un token  
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // enlever le mdp
        const { password: pass, ...rest } = validUser._doc;
        // creation de cookie
        res.cookie('acces_token', token, {
            httpOnly: true
        }).status(200).json(rest)

    } catch (error) {
        next(error)
    }
}





