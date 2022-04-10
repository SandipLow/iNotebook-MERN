const express = require('express');
const User = require("../models/user");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

// My web token signature...
const JWT_DATA = "sandip@low";


// ROUTE 1: Create a user using POST: "/api/auth/createuser" . No Log in required...
router.post('/createuser', [

    // Validation array
    body("name", "Enter name").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "password must not be less than 5").isLength({ min: 5 })

] ,

async (req, res) => {

    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if there any user with same email...
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({ error: "A user with this email already exist..."});
    }

    // Salting and Hashing the password using bcryptjs...
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user...
    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    })

    const data = {
        user : {
            id : user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_DATA);

    res.json({ authtoken: authtoken });
    // res.json(user);
    // res.send("Succsessful request...👍");

})

// ROUTE 2: Log in a user using POST: "/api/auth/login" . No Log in required...
router.post('/login', [

    // Validation array
    body("email", "Enter valid email").isEmail(),
    body("password", "password must not be less than 5").isLength({ min: 5 })

] ,

async (req, res) => {
    
    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring  of request body...
    const {email, password} = req.body;

    // Check the user with the email...
    let user = await User.findOne({ email });

    if (!user) {
        // The user doesn't exist...
        return res.status(400).json({ error: "Enter correct credentials..."});
    }

    // Check the password...
    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword) {
        // Password mismatch...
        return res.status(400).json({ error: "Enter correct credentials..."});
    }

    const data = {
        user : {
            id : user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_DATA);

    res.json({ authtoken: authtoken });
    // res.json(user);
    // res.send("Succsessful request...👍");
})

// ROUTE 3: get the user from authtoken using POST: "/api/auth/getuser" . Log in required...
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
    
        res.send(user);
        
    } catch (error) {
        console.log(error.message);
        res.send("Internal Server Error")
    }
})

module.exports = router