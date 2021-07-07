const express =require('express');
const router =express.Router();
const {TodoItem}=require("../models/todo.model");
const{User}=require('../models/user.model');
const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secret');
const{ValidateToken}=require('../middle ware/validation/validationToken.midware');
const{isItemPublisher}=require('../middle ware/validation/isItemPublisher.midware');

//get all users
router.get('/users',async (req,res)=>{
    
    const users  =await User.find();
    
    res.json({users});

});

//update users
router.put('/update/users/:id',async (req,res)=>{
    const {id}=req.params;
    const {name,email,password,phoneNumber,address,isAdmin}=req.body;
    
    const users = await Users.findByIdAndUpdate(
        id,
        {
            name,
            email,
            password,
            phoneNumber,
            address,
            isAdmin,
        },
        {
          new: true,
        }
      );
    
      if(!users){
          res.status(404).json({err:"items not found"});
      }
      res.json({users});
    
    
});
//todos/delete
router.delete('/delete/todos/:id',async (req,res)=>{
    const{id}=req.params;
    await TodoItem.findByIdAndDelete(id);
    res.json("todo item  deleted successfully");
});
//users/delete
router.delete('/delete/users/:id',async (req,res)=>{
    const{id}=req.params;
    await User.findByIdAndDelete(id);
    res.json("todo item  deleted successfully");
});

module.exports=router;