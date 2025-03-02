import { Router } from "express";
import { Request, Response } from "express";
import paths from "@backend/routes/paths";

const router = Router();

router.get(paths.LOGIN, (_: Request, res: Response) => {
  res.send("login");
});

router.get(paths.LOGOUT, (_: Request, res: Response) => {
  res.send("logout");
});

export default router;
