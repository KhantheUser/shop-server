const catchAsync = require("../util/catchAsync");
const Cart = require('../models/cartModel')

exports.createCart = catchAsync(async(req,res,next)=>{
    const newCart = await Cart.create(req.body)
    res.status(201).json({
        status : "success",
        data :{
            data : newCart
        }
    })
})

exports.updateCart = catchAsync(async(req,res,next)=>{
    
  
    
      const updateCart = await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      res.status(200).json({
          status:"success",
          data :{
              data : updateCart
          }
      })
  
})

exports.deleteCart = catchAsync((async(req,res,next)=>{
    
        await Cart.findByIdAndDelete(req.params.id)
     
        return res.status(204).json({
            data : null
        })
    
   
 }))


 exports.getCart = catchAsync((async(req,res,next)=>{
    
   
        const cart = await Cart.findOne({userId : req.params.userId})
        
        res.status(200).json({
            status:"success",
            data : {
                data : cart
            }
        })
    
}))

exports.getAllCarts = catchAsync((async(req,res,next)=>{
   
        const carts =  await Cart.find();
        res.status(200).json({
            status : "success",
            data :{
                data:carts
            }
        })
    
}))