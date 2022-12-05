const catchAsync = require("../util/catchAsync");
const Order = require('../models/orderModel')

exports.createOrder = catchAsync(async(req,res,next)=>{
    const newOrder = await Order.create(req.body)
    res.status(201).json({
        status : "success",
        data :{
            data : newOrder
        }
    })
})

exports.updateOrder = catchAsync(async(req,res,next)=>{
    
  
    
      const updateOrder = await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      res.status(200).json({
          status:"success",
          data :{
              data : updateOrder
          }
      })
  
})

exports.deleteOrder = catchAsync((async(req,res,next)=>{
    
        await Order.findByIdAndDelete(req.params.id)
     
        return res.status(204).json({
            data : null
        })
    
   
 }))


 exports.getOrder = catchAsync((async(req,res,next)=>{
    
   
        const order = await Order.findOne({userId : req.params.userId})
        
        res.status(200).json({
            status:"success",
            data : {
                data : order
            }
        })
    
}))

exports.getAllOrders = catchAsync((async(req,res,next)=>{
   
        const orders =  await Order.find();
        res.status(200).json({
            status : "success",
            data :{
                data:orders
            }
        })
    
}))

exports.getMonthly = catchAsync(async (req, res) => {
    console.log('asd')
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  })