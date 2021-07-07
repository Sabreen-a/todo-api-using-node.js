const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../../config/secret');
const{User}=require('../../models/user.model');
const{TodoItem}=require("../../models/todo.model");
const ValidateToken = async (req,res,next)=>{
    try{
        
       const token =req.headers.authorization.split(' ')[1];
       const user=jwt.verify(token,JWT_SECRET);
        req.user=user;
        next();
       
}catch(err){
    res.status(400).json({msg:'invalid user token'});
}
};
module.exports={ValidateToken};