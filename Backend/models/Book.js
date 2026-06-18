const mongoose = require("mongoose");


const bookSchema = mongoose.Schema(
{

name:{
 type:String,
 required:true
},


author:{
 type:String
},


category:{
 type:String
},


quantity:{
 type:Number,
 default:1
},


bookId:{
 type:String
},


issuedTo:[
 {
   memberId:{
    type:String
   },

   memberName:{
    type:String
   },

   memberEmail:{
    type:String
   },


   studentId:{
    type:String,
    default:null
   },


   customBookId:{
    type:String,
    default:null
   },


   date:{
    type:String
   },


   time:{
    type:String
   }
 }
]


},
{
 timestamps:true
}
);


module.exports = mongoose.model(
 "Book",
 bookSchema
);