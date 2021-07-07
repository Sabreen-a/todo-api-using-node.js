const express =require('express');
const router =express.Router();
const {TodoItem}=require("../models/todo.model");
const{User}=require('../models/user.model');
const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secret');
const{ValidateToken}=require('../middle ware/validation/validationToken.midware');
const{isItemPublisher}=require('../middle ware/validation/isItemPublisher.midware');
//todos/
router.get('/',ValidateToken,async (req,res)=>{
      if(req.user.isAdmin=="true"){
        const todoitems =await TodoItem.find();
        res.json({ todoitems});
     }else{
       const todoitems =await TodoItem.find({'publisherId':req.user.id});
       res.json({ todoitems});
    }
});
//get all todositems
router.get('/all', async (req, res) => {
  const todoitems = await TodoItem.find({});
  res.json({todoitems})
})
//create
router.post("/",ValidateToken,async (req,res)=>{
    const {title,content,completed} = req.body;
    const user=req.user;
   
   const todoitems=new TodoItem({
        title,
        content,
        publisherId:user.id,
        publisherName:user.name,
        completed,
    })
    await todoitems.save();
    res.json({todoitems});
});

//todos/update
router.put('/:id',ValidateToken,isItemPublisher,async (req,res)=>{
    const {id}=req.params;
    const {title,content,completed}=req.body;
    
    const items = await TodoItem.findByIdAndUpdate(
        id,
        {
          title,
          content,
          completed,
        },
        {
          new: true,
        }
      );
      
      if(!items){
          res.status(404).json({err:"items not found"});
      }
      res.json({items});
    
    
});
//todos/delete
router.delete('/:id',ValidateToken,isItemPublisher,async (req,res)=>{
    const{id}=req.params;
    await TodoItem.findByIdAndDelete(id);
    res.json("todo item  deleted successfully");
});
module.exports=router;