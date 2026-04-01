import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

async function deleteComment({ orderItemIds }: { orderItemIds: number }) {
  try {
    const response = await prisma.comment.delete({
      where: {
        orderItemIds,
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
  const session = await auth(req as any, res as any);

  const { orderItemIds } = req.body;

  if (!session || !session.user) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }

  try {
    const comment = await deleteComment({
      orderItemIds: orderItemIds,
    });
    res.status(200).json({ items: comment, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
