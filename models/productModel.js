const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    title : {
        type : String,
        required : [true,'User name is required'],
        unique : true,
    },
    description :{
        type :String,
        required : [true,'Description is required'],
       
    },
    img :{
        type :String,
        required : [true,'Image is required'],
       
    },
    categories :{
        type :Array,
       
       
    },
    size :{
        type :Array,
        required : [true,'Size is required'],
       
    },
    color :{
        type :Array,
        required : [true,'Color is required'],
       
    },
    price :{
        type :Number,
        required : [true,'Price is required'],
       
    },
    inStock :{
        type:Boolean,
        default :true
    }
    
   
    
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema);
