import { Router, Request, Response } from "express";
import { User } from "@prisma/client";
import paths from "@backend/routes/paths";
import { signup } from "@backend/controllers";

const router = Router();

const asyncHandler = (
  fn: (req: Request<{}, {}, User>, res: Response) => Promise<Response<{}>>
) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error(error);
    }
  };
};

router
  .post(paths.SIGNUP, asyncHandler(signup))
  // .post(paths.LOGIN, asyncHandler(login))
  // .post(paths.LOGOUT, asyncHandler(logout));

export default router;
