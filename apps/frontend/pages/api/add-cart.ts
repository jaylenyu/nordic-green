import type { NextApiRequest, NextApiResponse } from "next";
import { Cart, PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { getCustomUser } from "constants/user";

const prisma = new PrismaClient();

async function addCart(userId: string, item: Omit<Cart, "id" | "userId">) {
  try {
    const response = await prisma.cart.create({
      data: {
        userId,
        ...item,
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

  const { item } = req.body;

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
    const wishlist = await addCart(customUser.id, item);
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
