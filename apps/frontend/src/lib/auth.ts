import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    session({ session, user }) {
      if (session.user && user) {
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});
