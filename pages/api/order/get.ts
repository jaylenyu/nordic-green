import type { NextApiRequest, NextApiResponse } from "next";
import { OrderItem, PrismaClient } from "@prisma/client";
import { authOption } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getCustomUser } from "constants/user";

const prisma = new PrismaClient();

async function getOrder(userId: string) {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });

    let response = [];

    for (const order of orders) {
      let orderItems: OrderItem[] = [];
      for (const id of order.orderItemIds
        .split(",")
        .map((item) => Number(item))) {
        const res: OrderItem[] =
          await prisma.$queryRaw`SELECT i.id, quantity, amount, i.price, name, image_url, productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${id}`;
        orderItems.push.apply(orderItems, res);
      }
      response.push({ ...order, orderItems });
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
  const session = await getServerSession(req, res, authOption);

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
    const wishlist = await getOrder(customUser.id);
    res.status(200).json({ items: wishlist, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
