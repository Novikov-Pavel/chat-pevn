import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "@backend/db/prisma";

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies["jwt"] as string;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        fullname: true,
        profilePic: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
