import type { NextApiRequest, NextApiResponse } from "next";
import { Cart, OrderItem, PrismaClient } from "@prisma/client";
import { authOption } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
      console.log(`Created id : ${orderItem.id}`);
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
  console.log(session);

  const { items, orderInfo } = req.body;

  if (session == null) {
    res.status(200).json({ items: [], message: "No session" });
    return;
  }
  try {
    const wishlist = await addOrder(String(session.user.id), items, orderInfo);
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
