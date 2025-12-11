import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { pusherServesr } from "@/lib/Pusher";

// POST - Authenticate Pusher private channel
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

        const body = await request.text();
        const params = new URLSearchParams(body);
        const socketId = params.get("socket_id");
        const channel = params.get("channel_name");

        if (!socketId || !channel) {
            return NextResponse.json(
                { error: "Missing socket_id or channel_name" },
                { status: 400 }
            );
        }

        // Verify user is accessing their own private channel
        const expectedChannel = `private-user-${session.user.id}`;
        if (channel !== expectedChannel) {
            return NextResponse.json(
                { error: "Forbidden - Invalid channel access" },
                { status: 403 }
            );
        }

        // Authorize the channel
        const pusherAuth = pusherServesr.authorizeChannel(socketId, channel);

        return NextResponse.json(pusherAuth);
    } catch (error) {
        console.error("Error authenticating Pusher channel:", error);
        return NextResponse.json(
            { error: "Failed to authenticate channel" },
            { status: 500 }
        );
    }
}
