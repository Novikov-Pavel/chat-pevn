import { Router } from "express";
import paths from "@backend/routes/paths";
import { signup, login, logOut } from "@backend/controllers";

const router = Router();

router
  .post(paths.SIGNUP, signup)
  .post(paths.LOGIN, login)
  .post(paths.LOGOUT, logOut);

export default router;
