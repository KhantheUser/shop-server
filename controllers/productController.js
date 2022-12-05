const catchAsync = require("../util/catchAsync");
const Product = require('../models/productModel')

exports.createProduct = catchAsync(async(req,res,next)=>{
    const newProduct = await Product.create(req.body)
    res.status(201).json({
        status : "success",
        data :{
            data : newProduct
        }
    })
})

exports.updateProduct = catchAsync(async(req,res,next)=>{
    
  if(req.user.isAdmin){
    
      const updateProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      res.status(200).json({
          status:"success",
          data :{
              data : updateProduct
          }
      })
  }
})

exports.deleteProduct = catchAsync((async(req,res,next)=>{
    if(req.user.isAdmin){
        await Product.findByIdAndDelete(req.params.id)
     
        return res.status(204).json({
            data : null
        })
    }
    return next(new AppError('You do not have permission to delete',403))
 }))


 exports.getProduct = catchAsync((async(req,res,next)=>{
    
   
        const product =await Product.findById(req.params.id)
        
        res.status(200).json({
            status:"success",
            data : {
                data : product
            }
        })
    
}))

exports.getAllProducts = catchAsync((async(req,res,next)=>{
   
        const qNew = req.query.new 
        const qCategory = req.query.category
        
        let products;
        if(qNew){
            products = await Product.find().sort({_id : '-1'}).limit(5)
        }else if(qCategory){
            products = await Product.find({
                categories : {$in : [qCategory]}
            })
        }else {
            products = await Product.find()
        }
    
        
        
        res.status(200).json({
            status:"success",
            data : {
                data : products
            }
        })
    
}))