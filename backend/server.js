import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import connectDB from './config/dbConnnection.js'
import userRoutes from './routes/userRoutes.js';
import formRoutes from './routes/formRoutes.js'
import profileRoutes from './routes/profileRoutes.js';


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, Welcome to Green stride!');
});

app.use("/api/auth", userRoutes);
app.use("/api/form", formRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});