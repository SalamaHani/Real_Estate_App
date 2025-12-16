"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { pusherClient } from "@/lib/Pusher";
import type PusherClient from "pusher-js";

interface PusherContextType {
    pusherClient: typeof PusherClient.prototype | null;
    isConnected: boolean;
}

const PusherContext = createContext<PusherContextType>({
    pusherClient: null,
    isConnected: false,
});

export const usePusher = () => useContext(PusherContext);

interface PusherProviderProps {
    children: React.ReactNode;
}

export default function PusherProvider({ children }: PusherProviderProps) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Set up connection state listeners
        pusherClient.connection.bind("connected", () => {
            console.log("Pusher connected");
            setIsConnected(true);
        });

        pusherClient.connection.bind("disconnected", () => {
            console.log("Pusher disconnected");
            setIsConnected(false);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pusherClient.connection.bind("error", (error: any) => {
            console.error("Pusher connection error:", error);
        });

        // Clean up on unmount
        return () => {
            pusherClient.connection.unbind_all();
        };
    }, []);

    return (
        <PusherContext.Provider value={{ pusherClient, isConnected }}>
            {children}
        </PusherContext.Provider>
    );
}
