"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { useChangePasswordMutation } from "../api/useProfile";

interface AccountSettingsProps {
    userId: string;
    hasPassword: boolean; // false for OAuth-only users
}

export function AccountSettings({ userId, hasPassword }: AccountSettingsProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const changePasswordMutation = useChangePasswordMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");

        if (newPassword !== confirmPassword) {
            return;
        }

        changePasswordMutation.mutate(
            { userId, data: { currentPassword, newPassword } },
            {
                onSuccess: () => {
                    setSuccessMessage("Password changed successfully!");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                },
            }
        );
    };

    const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
    const isValid = currentPassword.length > 0 && newPassword.length >= 6 && passwordsMatch;

    if (!hasPassword) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                    <Lock size={20} className="text-slate-500" />
                    Account Settings
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    You signed in with Google. Password management is not available for OAuth accounts.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-800"
        >
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 sm:mb-6">
                <Lock size={18} className="text-indigo-500" />
                Password
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-10 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter current password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-10 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter new password (min 6 characters)"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-2.5 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${confirmPassword.length > 0 && !passwordsMatch
                            ? "border-red-300 dark:border-red-600"
                            : "border-slate-200 dark:border-slate-700"
                            }`}
                        placeholder="Confirm new password"
                    />
                    {confirmPassword.length > 0 && !passwordsMatch && (
                        <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}
                </div>

                {/* Error message */}
                {changePasswordMutation.isError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-500/10 p-3 rounded-xl">
                        <AlertCircle size={16} />
                        {changePasswordMutation.error?.message || "Failed to change password"}
                    </div>
                )}

                {/* Success message */}
                {successMessage && (
                    <div className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl">
                        <Check size={16} />
                        {successMessage}
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={!isValid || changePasswordMutation.isPending}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition-colors disabled:cursor-not-allowed"
                >
                    {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
                </button>
            </form>
        </motion.div>
    );
}
