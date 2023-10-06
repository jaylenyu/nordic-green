import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

async function getWishlist(userId: string) {
  try {
    const response = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    });
    console.log(response);
    return response?.productIds?.split(",") || [];
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

  if (session == null) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }
  try {
    const wishlist = await getWishlist(String(session.user.id));
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
