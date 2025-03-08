import { Router } from "express";
import paths from "@backend/routes/paths";
import { signup } from "@backend/controllers";

const router = Router();

router
  .post(paths.SIGNUP, signup)
  // .post(paths.LOGIN, asyncHandler(login))
  // .post(paths.LOGOUT, asyncHandler(logout));

export default router;
