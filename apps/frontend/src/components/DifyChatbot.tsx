"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function DifyChatbot() {
    const { data: session, status } = useSession();

    useEffect(() => {
        // Only enable chatbot for authenticated users
        if (status !== "authenticated" || !session) {
            return;
        }

        // Enable chatbot by adding class to body
        document.body.classList.add("dify-chat-enabled");

        // Add custom theme styles (colors/size/positioning)
        const themeStyle = document.createElement("style");
        themeStyle.id = "dify-chatbot-theme";
        themeStyle.textContent = `
            #dify-chatbot-bubble-button {
                background-color: #1C64F2 !important;
                bottom: 20px !important;
                right: 20px !important;
            }
            #dify-chatbot-bubble-window {
                width: 24rem !important;
                height: 36rem !important;
                position: fixed !important;
                max-height: calc(100vh - 100px) !important;
                bottom: 80px !important;
                right: 20px !important;
            }
        `;
        document.head.appendChild(themeStyle);

        // Cleanup: Remove class and styles when component unmounts
        return () => {
            document.body.classList.remove("dify-chat-enabled");
            const themeStyleEl = document.getElementById("dify-chatbot-theme");
            if (themeStyleEl) themeStyleEl.remove();
        };
    }, [session, status]);

    return null;
}

