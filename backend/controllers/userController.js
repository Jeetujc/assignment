import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const RegisterUser = asyncHandler (async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error('Email already exists');
    }
    const usernameExists = await User.findOne({ username });
    if(usernameExists) {
        res.status(400);
        throw new Error('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        role:"user"
    });
    if(!user) {
        res.status(400);
        throw new Error('User creation failed');
    }
    res.status(201).json({ id : user.id, email: user.email });
});

export const RegisterAdmin = asyncHandler (async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error('Email already exists');
    }
    const usernameExists = await User.findOne({ username });
    if(usernameExists) {
        res.status(400);
        throw new Error('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        role:"admin"
    });
    if(!user) {
        res.status(400);
        throw new Error('Admin creation failed');
    }
    res.status(201).json({ id : user.id, email: user.email });
});

export const LoginUser = asyncHandler(async(req, res) => {
    const {email,password}= req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const user = await User.findOne({ email });
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
        res.status(401);
        throw new Error('Invalid password');
    }
    const accessToken = jwt.sign(
        {
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
                role: user.role
            },
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    res.status(200).json({accessToken});
});

export const CurrentUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
});