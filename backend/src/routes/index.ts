import { Router } from "express";
import paths from "@backend/routes/paths";
import {
  signup,
  login,
  logOut,
  getMe,
  sendMessage,
  getMessages,
  getUsersForSidebar,
} from "@backend/controllers";
import { protectRoute } from "@backend/middleware";

const router = Router();

export const auth = router
  .get(paths.ME, protectRoute, getMe)
  .post(paths.SIGNUP, signup)
  .post(paths.LOGIN, login)
  .post(paths.LOGOUT, logOut);

export const messages = router
  .get(paths.CONVERSATIONS, protectRoute, getUsersForSidebar)
  .get(paths.GETMESSAGESBYID, protectRoute, getMessages)
  .post(paths.SENTBYID, protectRoute, sendMessage);
