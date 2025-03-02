import { Router } from "express";
import paths from "@backend/routes/paths";
import { signup } from "@backend/controllers";

const router = Router();

// router.post(paths.LOGIN, login);
// router.post(paths.LOGOUT, logout);
router.post(paths.SIGNUP, signup);

export default router;
