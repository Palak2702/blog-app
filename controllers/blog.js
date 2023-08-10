import blog from "../models/blog.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

//create

export const createblogs = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blog({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).json({
      msg: "blogs added",
      success: true,
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
    });
  }
};

//get blogs

export const getbooks = async (req, res) => {
  try {
    const blogs = await blog.find({}).populate("user");
    if (!blogs) {
      res.status(200).json({ message: "No blogs found" });
    }
    res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Blogs",
      error,
    });
  }
};
//delete

export const deleteblog = async (req, res) => {
  try {
    const Blogs = await blog.findByIdAndDelete(req.params.id).populate("user");
    await Blogs.user.blogs.pull(Blogs);
    await Blogs.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

//update

export const updateblog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { id } = req.params;

    const blogs = await blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    await blogs.save();
    return res.status(200).json({
      success: true,
      message: "updated succesfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};

export const getSingleblog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blog.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blogs,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Errorgetting single blog Blog",
      error,
    });
  }
};

//get user blog
export const userblog = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Errorgetting in user blog",
      error,
    });
  }
};
