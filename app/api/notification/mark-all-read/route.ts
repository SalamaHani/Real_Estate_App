import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { sendMarkAllReadEvent } from "@/lib/pusher-server";

// POST - Mark all notifications as read
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

        await prisma.notification.updateMany({
            where: {
                userId: session.user.id,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });

        // Trigger Pusher event for real-time update
        await sendMarkAllReadEvent(session.user.id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return NextResponse.json(
            { error: "Failed to mark all notifications as read" },
            { status: 500 }
        );
    }
}
