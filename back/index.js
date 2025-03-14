import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connexion reussi')
}).catch((err) => {
    console.log('Connection non reussi', err)
})

const app = express();

app.use(express.json())
app.use(cookieParser())




app.listen(3000, () => {

    console.log("Server is running on port 3000")
})
// Toutes les routes à utiliser
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)