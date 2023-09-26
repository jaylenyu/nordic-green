import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

async function getComment(userId: string, orderItemIds: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemIds: orderItemIds,
      },
    });
    console.log(response);

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

  if (session == null) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }

  if (orderItemIds == null) {
    res.status(200).json({ items: [], message: "No orderItemIds" });
    return;
  }
  try {
    const wishlist = await getComment(
      String(session.user.id),
      Number(orderItemIds)
    );
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
