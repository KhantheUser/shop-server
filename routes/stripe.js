const { response } = require('../app');
const AppError = require('../util/appError');

const router = require('express').Router();
const stripe = require('stripe')('sk_test_51MB7GvBVx1VB4V21wHa9Sxm8CxSYvuQObv5FonUfxe3KmeI0pGVJWm8NyMaWBbciNB9IdIeAy4tV7VRJ6RDcudww00P3PTIsA1')

router.route('/payment')
.post(async(req,res,next)=>{
  // const products = req.body.map((product,index)=>{
    //   return {
      //     price_data: {
        //         currency: 'usd',
        //         unit_amount: req.body.price,
        //         product_data: {
  //           name: req.body.name,
  //           description: 'my love forever',
  //           images: ['https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg'],
  //         },
  //       },
  //       quantity: 1,
  // }
  // })
  const URL = process.env.URL_CLIENT
  const products = req.body.map((product,index)=>{
    return {
      price_data: {
          currency: 'usd',
          unit_amount: product.price,
          product_data: {
            name: product.title,
            description: product.description,
            images: [product.img],
          },
        },
        quantity: product.quantity,
  }
  })
  const sessions =await  stripe.checkout.sessions.create({
        
        success_url : `${URL}checkout/success`,
        cancel_url :'https://www.udemy.com/',
        customer_email :'ducthiennguyen1601@gmail.com',
        line_items : products,
        
        
        
        // line_items:[{
        //     price_data: {
        //         currency: 'usd',
        //         unit_amount: req.body.price,
        //         product_data: {
        //           name: req.body.name,
        //           description: 'my love forever',
        //           images: ['https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg'],
        //         },
        //       },
        //       quantity: 1,
        // },
        // {
        //     price_data: {
        //         currency: 'usd',
        //         unit_amount: req.body.price,
        //         product_data: {
        //           name: 'dien thoai',
        //           description: ',y love forever',
        //           images: ['https://example.com/https://tbdn.com.vn/wp-content/uploads/2022/09/anh-gai-xinh-deo-kinh-can-13.jpgt-shirt.png'],
        //         },
        //       },
        //       quantity: 2,
        // }
        //     ],
            mode: 'payment',
  
    })
   
    res.status(200).json({
        status:'success',
        data : sessions
    })
    // res.redirect(sessions.url)
    
})
module.exports = router