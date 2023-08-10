import express from "express";
import {
  createblogs,
  deleteblog,
  getSingleblog,
  getbooks,
  updateblog,
  userblog,
} from "../controllers/blog.js";

const router = express.Router();

//create blogs
router.post("/create-blog", createblogs);

//get all blogs
router.get("/get-all", getbooks);

//delete blogs

router.delete("/delete-blog/:id", deleteblog);

//update blog
router.put("/update-blog/:id", updateblog);

//single blog
router.get("/get-blog/:id", getSingleblog);

// user blog get
router.get("/user-blog/:id", userblog);

export default router;
