import express from "express";
// import { Request, Response } from "express";
import paths from "@backend/routes/paths";
import routes from '@backend/routes';

const app = express();

app
  .use(paths.AUTH, routes)
  .listen(5000, () => {
    console.log("Server is running on port 5000");
  });
