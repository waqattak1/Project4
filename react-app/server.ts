import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from './src/models/User';

dotenv.config();

if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
    console.error('Required environment variables are not set');
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Authentication middleware
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            req.userId = decoded.userId;
        } catch (error) {
            console.error('Failed to authenticate token.');
        }
    }
    next();
});

app.listen(8000, () => console.log('Server is running on port 8000'));

mongoose.connect(process.env.MONGODB_URI!)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB', error));

// Register
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new UserModel({ email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.toString() });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.toString() });
    }
});
