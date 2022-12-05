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
app.use(express.static('public'));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  // var corsOptions = {
  //   origin: 'https://shop-client-azure.vercel.app/',
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }

app.use(cors());
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/checkout',stripeRoutes)

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next(); 
// })



app.all('*', (req, res, next) => {
    
    next(new AppError(`Can not find ${req.originalUrl}`,404))
  })
  app.use(globalErrorHandler)



const DATABASE = process.env.DATABASE_URL.replace('<password>',process.env.DATABASE_PASSWORD);

mongoose.connect(DATABASE).then(()=>{
    console.log('Connected to database');
}).catch(err => console(err));



module.exports = app;
