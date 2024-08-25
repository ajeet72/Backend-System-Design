import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';
const router = express.Router();
import { JWT_SECRET } from '../config';

//  this is the singup in route
router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, Email and password are required.');
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    
    const token = jwt.sign({userId: newUser.id,}, JWT_SECRET);

    res.json({
      message: "User created successfully",
      token: token,
    })
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error.');
  }
});

//  this is the singin in route
router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).send('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign({userId: user.id,}, JWT_SECRET);

    res.json({
      message: "User signed in successfully",
      token: token,
    })
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).send('Internal server error.');
  }
});

export default router;