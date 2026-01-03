"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export type StatusType = "loading" | "success" | "error" | "pending";

interface StatusIndicatorProps {
    status: StatusType;
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const statusConfig = {
    loading: {
        icon: Loader2,
        color: "text-primary-400",
        bgColor: "bg-primary-500/10",
        animate: true,
    },
    success: {
        icon: CheckCircle2,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        animate: false,
    },
    error: {
        icon: AlertCircle,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        animate: false,
    },
    pending: {
        icon: Clock,
        color: "text-slate-400",
        bgColor: "bg-slate-500/10",
        animate: false,
    },
};

const sizeConfig = {
    sm: { icon: 16, container: "w-8 h-8", text: "text-xs" },
    md: { icon: 24, container: "w-12 h-12", text: "text-sm" },
    lg: { icon: 32, container: "w-16 h-16", text: "text-base" },
};

/**
 * StatusIndicator - Professional loading/status component
 * Replaces legacy Loader.tsx with more flexibility
 */
export function StatusIndicator({
    status,
    message,
    size = "md",
    className,
}: StatusIndicatorProps) {
    const { icon: Icon, color, bgColor, animate } = statusConfig[status];
    const { icon: iconSize, container, text } = sizeConfig[size];

    return (
        <div className={cn("flex flex-col items-center gap-3", className)}>
            {/* Icon container with pulse effect */}
            <div className="relative">
                {/* Pulse rings for loading state */}
                {animate && (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className={cn(
                                "absolute inset-0 rounded-full border",
                                color.replace("text-", "border-")
                            )}
                        />
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className={cn(
                                "absolute inset-0 rounded-full border",
                                color.replace("text-", "border-")
                            )}
                        />
                    </>
                )}

                {/* Icon */}
                <div
                    className={cn(
                        "relative z-10 rounded-full flex items-center justify-center",
                        container,
                        bgColor
                    )}
                >
                    <Icon
                        size={iconSize}
                        className={cn(color, animate && "animate-spin")}
                    />
                </div>
            </div>

            {/* Message */}
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("text-slate-400 font-medium", text)}
                >
                    {message}
                </motion.p>
            )}
        </div>
    );
}

export default StatusIndicator;
