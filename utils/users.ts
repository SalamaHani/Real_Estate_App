"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/utils/db";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    // Create welcome notification for new user
    if (result?.user?.id) {
      try {
        await prisma.notification.create({
          data: {
            userId: result.user.id,
            type: "SYSTEM",
            title: `Welcome to Barrington Group, ${name}! 🏡`,
            message: `We're excited to have you here! Start exploring amazing properties, save your favorites, and find your dream home.`,
            link: "/",
            isRead: false,
          },
        });
      } catch (notificationError) {
        // Don't fail signup if notification creation fails
        console.error("Failed to create welcome notification:", notificationError);
      }
    }

    return {
      success: true,
      message: "Sign Up in successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export async function getSession() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });
  return session;
}
