import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { sendReadStatusEvent, sendDeleteEvent } from "@/lib/pusher-server";

// PATCH - Mark a notification as read/unread
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;
        const body = await request.json();
        const { isRead } = body;

        // Verify notification belongs to user
        const notification = await prisma.notification.findUnique({
            where: { id },
        });

        if (!notification) {
            return NextResponse.json(
                { error: "Notification not found" },
                { status: 404 }
            );
        }

        if (notification.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Update notification
        const updated = await prisma.notification.update({
            where: { id },
            data: { isRead: isRead ?? true },
        });

        // Get updated unread count
        const unreadCount = await prisma.notification.count({
            where: {
                userId: session.user.id,
                isRead: false,
            },
        });

        // Trigger Pusher event for real-time update
        await sendReadStatusEvent(session.user.id, id, unreadCount);

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating notification:", error);
        return NextResponse.json(
            { error: "Failed to update notification" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a notification
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;

        // Verify notification belongs to user
        const notification = await prisma.notification.findUnique({
            where: { id },
        });

        if (!notification) {
            return NextResponse.json(
                { error: "Notification not found" },
                { status: 404 }
            );
        }

        if (notification.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Delete notification
        await prisma.notification.delete({
            where: { id },
        });

        // Get updated unread count
        const unreadCount = await prisma.notification.count({
            where: {
                userId: session.user.id,
                isRead: false,
            },
        });

        // Trigger Pusher event for real-time update
        await sendDeleteEvent(session.user.id, id, unreadCount);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting notification:", error);
        return NextResponse.json(
            { error: "Failed to delete notification" },
            { status: 500 }
        );
    }
}
