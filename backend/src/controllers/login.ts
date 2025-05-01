import prisma from "@backend/db/prisma";
import { generateToken } from "@backend/utils";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const userSchema = z.object({
      username: z
        .string()
        .min(1, "Username is required")
        .max(20, "max length is 20 characters")
        .regex(/^[a-zA-Z0-9_.-]+$/, "Username contains invalid characters"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    });

    const { username, password } = userSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(400).json({ error: "There is no user with this username" });
      return;
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Password is incorrect" });
      return;
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Login error:", error.issues);

    if (error) {
      res.status(400).json({ error: error.issues });
      return;
    }
  }
};

const doSomethingAsync = (
  delay: number,
  callback: (error: Error | null, result: string | null) => void
): void => {
  setTimeout(() => {
    if (delay < 0) {
      callback(new Error("Delay must be non-negative"), null);
    } else {
      callback(null, "Operation completed successfully!");
    }
  }, delay);
};

doSomethingAsync(2000, (error, result) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Result:", result);
  }
});
