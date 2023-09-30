import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

type Data = {
  items?: any;
  message: string;
};

async function removeProductFromWishlist(userId: string, productId: number) {
  try {
    const wishlist = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!wishlist) throw new Error("Wishlist not found");

    const updatedProductIds = wishlist.productIds
      .split(",")
      .filter((id) => id !== String(productId))
      .join(",");

    const response = await prisma.wishList.update({
      where: { id: wishlist.id },
      data: { productIds: updatedProductIds },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOption);

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { productId } = req.body;

  if (!productId)
    return res.status(400).json({ message: "Product ID is required" });

  try {
    const updatedWishlist = await removeProductFromWishlist(
      String(session.user.id),
      productId
    );
    res.status(200).json({ items: updatedWishlist, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
