const express=require ('express');
const router=express.Router();
const{User}=require('../models/user.model');
const bcrypt=require('bcrypt');
const { UserDto } = require('../dto/user.dto');
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('../config/secret')

//auth/login
router.post('/login',async (req,res)=>{
    const{email,password,isAdmin}=req.body;
    const user=await User.findOne({email});
   if(!user) return res.status(404).json({msg:"user not found"});
    const validPassword=bcrypt.compareSync(password,user.password);
    if(!validPassword) return res.status(400).json({msg:"incorrect email or password"});
    const userData = UserDto(user);
     const token=jwt.sign(userData,JWT_SECRET);
    
    res.json({user:userData,token});
});
//auth/signup
router.post('/signup',async (req,res)=>{
    const{name,email,password,phoneNumber,address,isAdmin}=req.body;
    const existUser=await User.findOne({email});
   
    if(existUser){
        return res.status(400).json({msg:'user already exist'});
    }
    
    const user =new User({
        name,
        email,
        password,
        phoneNumber,
        address,
        isAdmin,
    });
    const hashedPassword= bcrypt.hashSync(password, 10)
    user.password=hashedPassword;
    await user.save();
    user.password="";
    res.status(201).json({user:UserDto(user)});
});
module.exports=router;