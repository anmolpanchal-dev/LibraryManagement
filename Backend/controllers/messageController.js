import Message from "../models/Message.js";


export const sendMessage = async(req,res)=>{

try{

console.log(req.body);


const {
 senderId,
 receiverId,
 text
}=req.body;


if(!senderId || !receiverId || !text){

return res.status(400).json({
message:"All fields required"
});

}



const message = await Message.create({

senderId,
receiverId,
text

});


res.status(201).json(message);


}catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

};




export const getMessages = async(req,res)=>{

try{

const messages =
await Message.find({
$or:[
{
 senderId:req.params.userId
},
{
 receiverId:req.params.userId
}
]
})
.sort({
createdAt:1
});


res.json(messages);


}catch(error){

res.status(500).json({
message:error.message
});

}

};