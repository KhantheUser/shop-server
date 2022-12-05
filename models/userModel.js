const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema =new mongoose.Schema({
    username : {
        type : String,
        required : [true,'User name is required'],
        unique : true,
    },
    email :{
        type :String,
        required : [true,'Email is required'],
        unique : true,
    },
    password :{
        type :String,
        required : [true,'Password is required'],
        minlength : 8,
        select : false
       
    },
    isAdmin :{
        type : Boolean,
        default :false
    },
    
},{timestamps:true})

userSchema.pre('save',async function(next){
    //only run this function if the password actually modified
    if(!this.isModified('password')) return next()
    //Hash the password with code 12 and delete the password confirmation field
    this.password = await bcrypt.hash(this.password,12)
    
 
    next()
})
userSchema.pre('save',function(next){
    if(!this.isModified('password')||this.isNew) return next()
    this.passwordChangedAt =    Date.now()-1000;
    next()
    
})
userSchema.methods.comparePassword =async function(candicatePassword,userPassword){
    return await bcrypt.compare(candicatePassword,userPassword)
}


module.exports = mongoose.model('User',userSchema);
