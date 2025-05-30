import prisma from "@/prisma/client";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { cookies } from 'next/headers'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

type UserType = 'employer' | 'jobSearcher'

const getUserType = () => {
  const cookieStore = cookies()
  const userType: RequestCookie | undefined = cookieStore.get('user-type')
  const type = (userType?.value ?? 'jobSearcher') as UserType
  return type;
}

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
        const passwordMatch = await bcrypt.compare(credentials.password, user.password!)
        if (!passwordMatch) throw new Error('Incorrect details');

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
        }
      }
    }
    ),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.email) return false;
      const type = getUserType()

      if (account?.provider === "google") {
        try {
          const updateUser = await prisma.users.upsert({
            where: {
              email: user.email,
            },
            update: {
              name: user.name,
              image: user.image,
            },
            create: {
              image: user.image,
              email: user.email,
              name: user.name,
              phone: "",
              status: "",
              type: type,
            }
          })
          if (updateUser.type != type)
            return false
        } catch (error) {
          throw error
        }
      }
      else {
        const userFound = await prisma.users.findUnique({
          where: { email: user.email }
        })
        if (userFound?.type != type)
          return false
      }
      return true;
    },
    async session({ session, token }) {
      const { user } = session
      const type = getUserType()
      return {
        ...session,
        user: { ...user, type: type },
      };
    },
    async jwt({ user, token }) {
      if (user) return token
      return token
    },
  },
};
