import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"

// Api signup(inscription)

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("Creation de l'utilisateur reussie")
    } catch (error) {
        res.status(500).json(error.message)
    }

}