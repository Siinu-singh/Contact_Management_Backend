const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @ desc get all users
// @ route Post /api/user/register
// @ access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide all fields');
    }
    // check if user exists
    const isExistuser = await User.findOne({ email });
    if (isExistuser) {
        res.status(400);
        throw new Error('User already exists! Try logging in instead');
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);

    // create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        });
        console.log(`User registered successfully with name:`, username, `and email:`, email);
    } else {
        res.status(400);
        throw new Error(`Invalid user data`);
    }

});

// @ desc login user
// @ route POST /api/user/login
// @ access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const jwtToken = jwt.sign({
            user: {
                username:user.username,
                email: user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN,
        {expiresIn:"15m"}
    );
    res.json(`Your JWT Token is: ${jwtToken}`);
    }else{
        res.status(401);
        throw new Error(`Email or Password is Invalid`);
    }
});


// @ desc current user
// @ route POST /api/user/current
// @ access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current User Information' });
    console.log('Current User Information');
});




module.exports = { registerUser, loginUser, currentUser };