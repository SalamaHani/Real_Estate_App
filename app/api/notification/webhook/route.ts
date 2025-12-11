import { NextRequest, NextResponse } from "next/server";
import { createWelcomeNotification, createLoginNotification } from "@/lib/notification-helpers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/utils/db";

/**
 * Webhook to handle user sign-up and login events
 * This creates welcome/login notifications
 */
export async function POST(request: NextRequest) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { eventType } = body; // 'signup' or 'login'

        const userId = session.user.id;
        const userName = session.user.name || "there";

        if (eventType === "signup") {
            // Create welcome notification for new user
            await createWelcomeNotification(userId, userName);
            return NextResponse.json({
                success: true,
                message: "Welcome notification created"
            });
        } else if (eventType === "login") {
            // Create login notification for returning user
            await createLoginNotification(userId, userName);
            return NextResponse.json({
                success: true,
                message: "Login notification created"
            });
        }

        return NextResponse.json(
            { error: "Invalid event type" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error in notification webhook:", error);
        return NextResponse.json(
            { error: "Failed to process notification" },
            { status: 500 }
        );
    }
}
