const {Schema,model,Types}=require('mongoose');

const todoSchema =Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
        
    },
    
    publisherId:{
        type:Types.ObjectId,
        required:true
    },
    publisherName:{
        type:String,
        required:true
    },
    completed:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});
const TodoItem =model('todoItems',todoSchema);
module.exports={TodoItem};