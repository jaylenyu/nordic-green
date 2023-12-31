import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOption: NextAuthOptions = {
  theme: {
    colorScheme: "light",
    logo: "/Logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 1 * 60 * 60 * 24,
  },
  callbacks: {
    session: async (params) => {
      const session = params.session as any;
      const user = params.user;
      if (session.user && user) {
        session.user.id = user.id;
      }
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOption);
