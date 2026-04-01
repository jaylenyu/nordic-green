import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

async function deleteOrder(id: number) {
  try {
    const response = await prisma.orders.delete({
      where: {
        id: id,
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

  const { id } = req.body;

  if (session == null) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }
  try {
    const wishlist = await deleteOrder(id);
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
