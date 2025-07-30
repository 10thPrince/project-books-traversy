import express from "express";
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 5001

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: "App running successful!!"})
})

app.listen(port, ()=>{
    console.log(`App running on ${port} perfectly!`)
})