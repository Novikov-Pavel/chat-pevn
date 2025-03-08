import express from "express";
import paths from "@backend/routes/paths";
import routes from "@backend/routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app
  .use(express.json())
  .use(paths.AUTH, routes)
  .listen(5000, () => {
    console.log("Server is running on port 5000");
  });
