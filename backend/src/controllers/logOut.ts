import { User } from "@prisma/client";
import { Request, Response } from "express";

export const logOut = async (
  req: Request<{}, {}, User>,
  res: Response
): Promise<void> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
