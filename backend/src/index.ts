import express from "express";
import paths from "@backend/routes/paths";
import { auth, messages } from "@backend/routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app
  .use(cookieParser())
  .use(express.json())
  .use(paths.AUTH, auth)
  .use(paths.MESSAGES, messages)
  .listen(5000, () => {
    console.log("Server is running on port 5000");
  });
