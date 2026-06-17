const Member = require("../models/Member");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { name, email, phone, password } =
      req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Student account already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const member = await Member.create({
      name,
      email,
      phone,
    });

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Member Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
};