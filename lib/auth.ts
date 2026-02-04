import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/utils/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3001", "http://10.30.0.85:3001"],
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
