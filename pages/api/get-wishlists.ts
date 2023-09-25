import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

async function getWishlists(userId: string) {
  try {
    const wishlist = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    });

    const productId = wishlist?.productIds
      .split(",")
      .map((item) => Number(item));
    if (productId && productId.length > 0) {
      const response = await prisma.products.findMany({
        where: {
          id: {
            in: productId,
          },
        },
      });
      return response;
    }
    return [];
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
    const wishlist = await getWishlists(String(session.user.id));
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
