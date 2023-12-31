import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    });

    let response = [];

    for (const orderItem of orderItems) {
      const res = await prisma.comment.findUnique({
        where: {
          orderItemIds: orderItem.id,
        },
      });
      if (res) {
        response.push({ ...orderItem, ...res });
      }
    }

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
  const { productId } = req.query;
  if (productId == null) {
    res.status(200).json({ items: [], message: "No productId" });
    return;
  }
  try {
    const wishlist = await getComments(Number(productId));
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
