const catchAsync = require('../util/catchAsync')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const AppError = require('../util/appError');

const signToken = (id)=>{
    return jwt.sign({
        id : id
    },process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

exports.register = catchAsync(async(req,res,next)=>{
    const newUser = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    res.status(201).json({
        status: 'success',
        data: {
          data: newUser,
            
        },
        
      });
})

exports.login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
      return  next(new AppError('Please provide email and password',400))
    }
    const user =await User.findOne({email:email}).select('+password')
    if(!user || !await user.comparePassword(password,user.password)){
        return next(new AppError('Incorrect email or password',401))
    }
    res.status(200).json({
        status:'success',
        data : {
            data:user,
            accessToken : signToken(user._id)
        },
    })
})

