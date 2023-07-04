import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// User registration endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  let user = await User.findOne({ username });
  if (user) return res.status(400).send('User already registered.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  res.send('User registered successfully');
});

// User login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid username or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
  res.send(token);
});

export default router;
