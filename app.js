const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripe');
const cors = require('cors')
const AppError = require('./util/appError')
const globalErrorHandler = require('./controllers/errorController');
dotenv.config(
    {
        path :'./.env'
    }
);

const app = express();
// app.use(express.static('public'));
// app.use(express.json());
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
//   }

// app.use(cors());
// app.use('/api/auth',authRoutes)
// app.use('/api/user',userRoutes)
// app.use('/api/product',productRoutes)
// app.use('/api/cart',cartRoutes)
// app.use('/api/order',orderRoutes)
// app.use('/api/checkout',stripeRoutes)




// app.all('*', (req, res, next) => {
    
//     next(new AppError(`Can not find ${req.originalUrl}`,404))
//   })
//   app.use(globalErrorHandler)


app.get('/api/product',(req,res)=>{
  res.send('hellooooo')
})
// const DATABASE = process.env.DATABASE_URL.replace('<password>',process.env.DATABASE_PASSWORD);

// mongoose.connect(DATABASE).then(()=>{
//     console.log('Connected to database');
// }).catch(err => console(err));



module.exports = app;
