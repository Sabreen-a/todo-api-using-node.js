const mongoose=require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:String,
    isAdmin:{
        type:String,
        default:false,
    }
   
});
const User=mongoose.model('todouser',userSchema);
module.exports = {User};