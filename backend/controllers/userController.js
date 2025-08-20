import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asynchandler from 'express-async-handler'
import User from '../models/userModel.js'

//@DESC Reqgister new User
//@ROUTE POST /users/
//@ACCESS Public
export const registerUser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            Message: " Please Fill In All required Fields"
        })
    }

    //user Exist
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({
            message: "User Already Exist Please LogIn!"
        })
    }

    //Hash the PAssword

    const hashedPassword = await bcrypt.hash(password, 10);

    //create user

    const newUser = {
        name,
        email,
        password: hashedPassword
    }

    const user = await User.create(newUser);

    if (user) {
        return res.status(201).json({
            message: "User created Successfully",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }
        })
    } else {
        return res.status(400).json({ message: 'Invalid User Data' })
    }

})

//@DESC Login  User
//@ROUTE POST /users/login
//@ACCESS Public
export const login = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            Message: " Please Fill In All required Fields"
        })
    }

    //user existance
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "User doesn't Exist Please Register!"
        })
    }

    //compare passwords
    const isMach = await bcrypt.compare(password, user.password);

    if (!isMach) {
        return res.status(400).json({
            message: 'The Passord Does Not Mach'
        })
    }

    res.status(200).json({
        message: "Logged In Successfully!!!",
        data: {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }
    })


})


//@DESC Get  User Data
//@ROUTE Get /users/me
//@ACCESS Private
export const getMe = asynchandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
})


//generate the token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}