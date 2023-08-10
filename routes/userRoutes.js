import express from "express";
import {
  getAllusers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

//get all user
userRouter.get("/all-users", getAllusers);

//create user post

userRouter.post("/register", registerUser);

//login
userRouter.post("/login", loginUser);

export default userRouter;
