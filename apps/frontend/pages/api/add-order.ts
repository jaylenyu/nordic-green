import type { NextApiRequest, NextApiResponse } from "next";
import { OrderItem, PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getCustomUser } from "constants/user";

const prisma = new PrismaClient();

async function addOrder(
  userId: string,
  items: Omit<OrderItem, "id">[],
  orderInfo?: { receiver: string; address: string; phoneNumber: string }
) {
  try {
    let orderItemIds = [];

    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      });
      orderItemIds.push(orderItem.id);
    }

    const response = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(","),
        ...orderInfo,
        status: 0,
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

  const { items, orderInfo } = req.body;

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
    const wishlist = await addOrder(customUser.id, items, orderInfo);
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
