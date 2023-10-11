import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getCustomUser } from "constants/user";

const prisma = new PrismaClient();

async function getComment(userId: string, orderItemIds: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemIds: orderItemIds,
      },
    });

    if (response?.userId == userId) {
      return response;
    }
    return { message: "userId is not matched" };
  } catch (error) {
    console.error(error);
    return [];
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOption);
  const { orderItemIds } = req.body;

  if (!session || !session.user) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }

  const customUser = getCustomUser(session);
  if (!customUser || !customUser.id) {
    res.status(400).json({ message: "Invalid user data" });
    return;
  }

  if (orderItemIds == null) {
    res.status(200).json({ items: [], message: "No orderItemIds" });
    return;
  }

  try {
    const wishlist = await getComment(customUser.id, Number(orderItemIds));
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
