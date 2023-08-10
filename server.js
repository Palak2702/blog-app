import express from "express";
import cors from "cors";

import connectdb from "./config/database.js";
import dotenv from "dotenv";
import router from "./routes/blogRoute.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

connectdb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/blog", router);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
