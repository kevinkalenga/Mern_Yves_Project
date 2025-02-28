import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connexion reussi')
}).catch((err) => {
    console.log('Connection non reussi', err)
})

const app = express();


app.listen(3000, () => {

    console.log("Server is running on port 3000")
})