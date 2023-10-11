import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getCustomUser } from "constants/user";

const prisma = new PrismaClient();

async function updateComment({
  userId,
  orderItemIds,
  rate,
  contents,
}: {
  userId: string;
  orderItemIds: number;
  rate: number;
  contents: string;
}) {
  try {
    const response = await prisma.comment.upsert({
      where: {
        orderItemIds,
      },
      update: {
        contents,
        rate,
      },
      create: {
        userId,
        orderItemIds,
        rate,
        contents,
      },
    });

    return response;
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

  const { orderItemIds, rate, contents } = req.body;

  if (!session || !session.user) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }

  const customUser = getCustomUser(session);
  if (!customUser || !customUser.id) {
    res.status(400).json({ message: "Invalid user data" });
    return;
  }

  try {
    const wishlist = await updateComment({
      userId: customUser.id,
      orderItemIds: orderItemIds,
      rate: rate,
      contents: contents,
    });
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
