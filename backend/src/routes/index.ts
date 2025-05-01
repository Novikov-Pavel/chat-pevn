import { Router } from "express";
import paths from "@backend/routes/paths";
import { signup, login, logOut, getMe } from "@backend/controllers";
import { protectRoute } from "@backend/middleware";

const router = Router();

router
  .get(paths.ME, protectRoute, getMe)
  .post(paths.SIGNUP, signup)
  .post(paths.LOGIN, login)
  .post(paths.LOGOUT, logOut);

export default router;
