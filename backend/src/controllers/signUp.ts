import { Request, Response } from "express";
import { User } from "@prisma/client";
import prisma from "@backend/db/prisma";
import { generateToken } from "@backend/utils";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const signup = async (
  req: Request<{}, {}, User>,
  res: Response
): Promise<any> => {
  try {
    const userSchema = z
      .object({
        fullname: z.string().min(1, "Full name is required"),
        username: z.string().min(1, "Username is required"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
          .string()
          .min(6, "Confirm password must be at least 6 characters long"),
        gender: z.enum(["male", "female"]),
      })
      .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords don't match",
        path: ["password"],
      })
      .refine(({ gender }) => ["male", "female"].includes(gender), {
        message: "Gender must be either 'male' or 'female",
        path: ["gender"],
      });

    const { success, error } = userSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: error.issues });
    }

    const { fullname, username, password, gender } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt: string = await bcryptjs.genSalt(10);
    const hashedPassword: string = await bcryptjs.hash(password, salt);

    const boyProfilePic: string = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic: string = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser: User = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      return res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Errorrrrr" });
  }
};
