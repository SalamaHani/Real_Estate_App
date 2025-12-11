"use client";

import { useEffect } from "react";
import { toast } from "sonner";

/**
 * Component to send welcome notification on first login
 * Place this in a layout or page that loads after authentication
 */
export default function WelcomeNotificationTrigger() {
    useEffect(() => {
        const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
        const isNewUser = sessionStorage.getItem("isNewUser");

        if (!hasLoggedIn) {
            // Trigger notification on first login of this session
            const eventType = isNewUser === "true" ? "signup" : "login";

            fetch("/api/notification/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventType }),
            })
                .then((res) => res.json())
                .then(() => {
                    // Mark as logged in for this session
                    sessionStorage.setItem("hasLoggedIn", "true");
                    sessionStorage.removeItem("isNewUser");
                })
                .catch((error) => {
                    console.error("Error triggering notification:", error);
                });
        }
    }, []);

    return null; // This component doesn't render anything
}
