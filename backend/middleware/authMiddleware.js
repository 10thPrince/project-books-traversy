import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

export const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get Token From header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decode.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({message: 'Not Authorized'})
        }
    }

    if(!token){
        res.status(401).json({message: 'Not Authorized, No Token!'})
    }
})