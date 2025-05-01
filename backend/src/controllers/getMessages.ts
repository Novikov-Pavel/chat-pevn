import { Request, Response } from "express";
import prisma from "@backend/db/prisma";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    if (!req.user || !userToChatId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const authUserId = req.user?.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullname: true,
        profilePic: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
