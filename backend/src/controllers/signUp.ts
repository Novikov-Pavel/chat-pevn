import { Request, Response } from "express";
import { Gender, User } from "@prisma/client";
import prisma from "@backend/db/prisma";
import { generateToken } from "@backend/utils";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const signup = async (
  req: Request<{}, {}, User>,
  res: Response
): Promise<void> => {
  try {
    const userSchema = z.object({
      fullname: z
        .string()
        .min(1, "Full name is required")
        .max(20, "max length is 20 characters"),
      username: z
        .string()
        .min(1, "Username is required")
        .max(20, "max length is 20 characters")
        .regex(/^[a-zA-Z0-9_.-]+$/, "Username contains invalid characters"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: z
        .string()
        .min(6, "Confirm password must be at least 6 characters long")
        .refine((val) => val === req.body.password, {
          message: "Passwords don't match",
        }),
      gender: z.nativeEnum(Gender, {
        message: "Invalid gender value, expected male or female",
      }),
    });

    const parsedBody = userSchema.parse(req.body);

    const { fullname, username, password, gender } = parsedBody;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    const salt: string = await bcryptjs.genSalt(10);
    const hashedPassword: string = await bcryptjs.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic,
      },
    });

    generateToken(newUser.id, res);

    res.status(201).json({
      id: newUser.id,
      fullName: newUser.fullname,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Signup error:", error.issues);

    if (error) {
      res.status(400).json({ error: error.issues });
      return;
    }
  }
};
