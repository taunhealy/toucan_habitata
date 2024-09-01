import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser, AdapterAccount } from "next-auth/adapters"; // Added AdapterAccount to the import

// Custom adapter wrapper
const CustomPrismaAdapter = (prismaClient: typeof prisma) => {
  const prismaAdapter = PrismaAdapter(prismaClient);
  return {
    ...prismaAdapter,
    createUser: async (user: Omit<AdapterUser, "id">) => {
      if (typeof prismaAdapter.createUser === "function") {
        return prismaAdapter.createUser(user as AdapterUser);
      } else {
        throw new Error("createUser function is undefined");
      }
    },
    linkAccount: async (account: AdapterAccount) => {
      if (typeof prismaAdapter.linkAccount === "function") {
        return prismaAdapter.linkAccount(account);
      } else {
        throw new Error("linkAccount function is undefined");
      }
    },
  };
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  // @ts-ignore
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
