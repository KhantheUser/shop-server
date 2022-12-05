const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../util/appError');

exports.verifyToken =async(req,res,next)=>{
    
    const authHeader = req.headers.token
   
    if(authHeader){
        try{
            const token = authHeader.split(' ')[1];
            const decoded =await jwt.verify(token,process.env.JWT_SECRET)
            const {id} = decoded;
            
            const foundUser =await User.findById(id);
            
            if(!foundUser){
                return next(new AppError('The user belongs to this token is no longer existent',401))
               }
            req.user = foundUser;
            next()   
        }catch(e){
            res.status(401).json({
                status :"Fail",
                message :"You are not authorized to access"
            })
        }
    }else{
        res.status(401).json({
            stutus :"Fail",
            message:"You are not authorized"
        })
    }
}

exports.verifyTokenAuthorization = (req,res,next)=>{
     


    if(req.user.id === req.params.id || req.user.isAdmin || req.user.id === req.body.userId){
        next()
    }else{
        return next(new AppError('You are not allowed to update this user',403))
    }

}

