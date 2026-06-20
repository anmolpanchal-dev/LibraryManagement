const Member = require("../models/Member");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


// GET ALL MEMBERS
const getMembers = async (req, res) => {
  try {

    const members = await Member.find();

    res.status(200).json(members);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// ADD MEMBER
const addMember = async (req, res) => {
  try {

    let {
      name,
      email,
      phone,
      password,
      studentId
    } = req.body;


    // check email in Member
    const existingMember =
      await Member.findOne({ email });


    if(existingMember){
      return res.status(400).json({
        message:"Email already exists"
      });
    }



    // check email in User
    const existingUser =
      await User.findOne({ email });


    if(existingUser){
      return res.status(400).json({
        message:"Student account already exists"
      });
    }



    // Auto generate ID
    if(!studentId){

      const lastMember =
        await Member.findOne()
        .sort({createdAt:-1});


      let next = 1001;


      if(lastMember?.studentId){

        const oldNumber =
          parseInt(
            lastMember.studentId.replace("LIB","")
          );


        if(!isNaN(oldNumber)){
          next = oldNumber + 1;
        }

      }


      studentId = `LIB${next}`;

    }



    const hashedPassword =
      await bcrypt.hash(password,10);



    const member =
      await Member.create({

        name,
        email,
        phone,
        studentId

      });



    await User.create({

      name,
      email,
      password:hashedPassword,
      role:"student",
      studentId

    });



    res.status(201).json(member);



  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};





// UPDATE MEMBER
const updateMember = async(req,res)=>{

  try{

    const member =
      await Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new:true
        }
      );


    res.status(200).json(member);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};





// DELETE MEMBER
const deleteMember = async(req,res)=>{

try{


  const member =
    await Member.findByIdAndDelete(
      req.params.id
    );


  if(!member){

    return res.status(404).json({
      message:"Member not found"
    });

  }



  // ⭐ User collection se bhi delete
  await User.findOneAndDelete({
    email: member.email
  });



  res.status(200).json({

    message:"Member deleted successfully"

  });



}catch(error){

  res.status(500).json({
    message:error.message
  });

}

};




module.exports = {

 getMembers,
 addMember,
 updateMember,
 deleteMember

};