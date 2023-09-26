import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
  console.log(session);

  const { orderItemIds, rate, contents } = req.body;

  if (session == null) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }
  try {
    const wishlist = await updateComment({
      userId: String(session.user.id),
      orderItemIds: orderItemIds,
      rate: rate,
      contents: contents,
    });
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
