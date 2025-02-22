import { Router } from "express";
import { Request, Response } from "express";
import paths from "backend/src/routes/paths.json";

const router = Router();

router.get(paths.LOGIN, (req: Request, res: Response) => {
  res.send("login");
});

router.get(paths.LOGOUT, (req: Request, res: Response) => {
  res.send("logout");
});

export default router;
