const{TodoItem}=require('../../models/todo.model');
const{User}=require("../../models/user.model")

const isItemPublisher=async (req,res,next)=>{
    const {id}=req.params;
    const item=await TodoItem.findById(id);
    const users=await User.findById(id);
    
     if (!item) {
        return res.status(404).json({msg: "items Not Found"})
    }
    const user=req.user;
    if(user.isAdmin=="false"){
        if(item.publisherId!=user.id){return res.status(403).json({msg:"you are not allowed for the action"})}
        req.item=item;
        next();
    }else{
        
        next();
    }
   
   

};
module.exports={isItemPublisher};