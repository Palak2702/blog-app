import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// get all users

// create user register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please fill all fields",
      });
    }
    //existing user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(500).send({
        message: "alerady registered",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "new user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Eroror in register",
      success: false,
      error,
    });
  }
};

//login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Eroror in register",
      success: false,
      error,
    });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Eroror in get all user",
      success: false,
      error,
    });
  }
};
