const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./src/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Authentication middleware
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'yourjwtsecret');
      req.userId = decoded.userId;
    } catch (error) {
      console.error('Failed to authenticate token.');
    }
  }
  next();
});

app.listen(8000, () => console.log('Server is running on port 8000'));

mongoose.connect('mongodb+srv://waqattak:Warlord5@cluster0.r2glb.mongodb.net/bling-bazaar?retryWrites=true&w=majority')
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
    res.status(500).json({ message: 'Error registering user' });
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

    const token = jwt.sign({ userId: user._id }, 'yourjwtsecret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
});
