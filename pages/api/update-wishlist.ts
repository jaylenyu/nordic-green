import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getCustomUser } from "constants/user";

const prisma = new PrismaClient();

async function updateWishlist(userId: string, productId: string) {
  try {
    const wishlist = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    });

    const originWishlist =
      wishlist?.productIds != null && wishlist.productIds !== ""
        ? wishlist.productIds.split(",")
        : [];

    const isWished = originWishlist.includes(productId);

    const newWishlist = isWished
      ? originWishlist.filter((id) => id !== productId)
      : [...originWishlist, productId];

    const response = await prisma.wishList.upsert({
      where: {
        userId,
      },
      update: {
        productIds: newWishlist.join(","),
      },
      create: {
        userId,
        productIds: newWishlist.join(","),
      },
    });

    if (!response?.productIds) throw new Error("ProductIds not found");

    return response?.productIds.split(",");
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

  const { productId } = req.body;

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
    const wishlist = await updateWishlist(customUser.id, String(productId));
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
