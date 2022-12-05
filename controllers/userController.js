
const User = require('../models/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

exports.upDateUser = catchAsync(async(req,res,next)=>{
    
    if(req.body.password){
        const user =await User.findById(req.params.id);
        user.password = req.body.password;
        await user.save()
    }
    const {password,...others} = req.body
    const updateUser = await User.findByIdAndUpdate(req.params.id,others,{
        runValidators: true,
        new : true
    })
    
    res.status(201).json({
        status:"Success",
        data :{
            data: updateUser
        }
    })

})

exports.deleteUser = catchAsync((async(req,res,next)=>{
    if(req.user.isAdmin){
       await User.findByIdAndDelete(req.params.id)
    
       return res.status(204).json({
           data : null
       })
   }
   return next(new AppError('You do not have permission to delete',403))
}))

exports.getUser = catchAsync((async(req,res,next)=>{
    
    if(req.user.isAdmin){
        const user =await User.findById(req.params.id)
        
        res.status(200).json({
            status:"success",
            data : {
                data : user
            }
        })
    }else {
        return next(new AppError('You are not authorized',403))
    }
}))

exports.getAllUser = catchAsync((async(req,res,next)=>{
    if(req.user.isAdmin){
        const query = req.query.new 
    
        const users =query? await User.find().sort({_id : '-1'}).limit(5) : await User.find()
        
        res.status(200).json({
            status:"success",
            data : {
                data : users
            }
        })
    }else {
        return next(new AppError('You are not authorized',403))
    }
}))

exports.getStats = catchAsync(async (req, res,next) => {
   
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  })


