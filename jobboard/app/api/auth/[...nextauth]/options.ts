import prisma from "@/prisma/client";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
        if (!user) throw new Error('Incorrect details');
        // @ts-ignore
        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) throw new Error('Incorrect details');

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    }
    ),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.email) return false;
      if (account?.provider === "google") {
        await prisma.users.upsert({
          where: {
            email: user.email,
          },
          update: {
            name: user.name,
          },
          create: {
            image: user.image as string,
            email: user.email as string,
            name: user.name as string,
            phone: "",
            status: "",
            username: ""
          },
        })
      }
      return true;
    },
    async session({ session, token }) {
      console.log({ session, token });
      return {
        ...session,
        user: session.user        
      };
    },
    async jwt({ user, token }) {
      if (user) return token
      return token
    },
  },
};
