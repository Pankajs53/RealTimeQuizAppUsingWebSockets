const User = require("../models/user");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require("dotenv").config();
const private_key = process.env.JWT_SECRET;
const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

const signUp = async(req,res)=>{
    try {
        // Extract user data from request body
        const { name, email, password,role } = req.body;
        console.log("name of user is->",name)

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email:email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword,roles:role });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const login = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // create a token using jsonwebtoken and pass in a cookie
        const token = jwt.sign({ _id: user._id },private_key);
        console.log("Token is->",token);
        // Respond with success message or token
        return res.status(200).cookie("Auth-Cookie", token, cookieOptions).json({
            success: true,
            message:"Logged in succesfully",
            token:token,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signUp, login };