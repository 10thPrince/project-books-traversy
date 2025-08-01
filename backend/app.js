import express from "express";
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes.js'
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5001

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: "App running successful!!"})
})

app.use('/book', bookRoutes)

connectDB(); 

app.listen(port, ()=>{
    console.log(`App running on ${port} perfectly!`)
})