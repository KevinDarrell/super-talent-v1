"use client";

import { useEffect, useLayoutEffect, useCallback } from "react";
import { useTheme, colorSchemeTokens } from "@/hooks/useTheme";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ThemeHydration() {
    const mode = useTheme((s) => s.mode);
    const colorScheme = useTheme((s) => s.colorScheme);
    const setSystemPreference = useTheme((s) => s.setSystemPreference);
    const resolvedTheme = useTheme((s) => s.resolvedTheme);

    // Apply theme immediately on mount
    useIsomorphicLayoutEffect(() => {
        const root = document.documentElement;

        // Apply dark/light mode
        if (resolvedTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Apply color scheme CSS variables
        const tokens = colorSchemeTokens[colorScheme];
        root.style.setProperty('--accent', tokens.accent);
        root.style.setProperty('--accent-foreground', tokens.accentForeground);
        root.style.setProperty('--primary', tokens.primary);
        root.style.setProperty('--primary-foreground', tokens.primaryForeground);
        root.dataset.colorScheme = colorScheme;

        // Enable smooth transitions after initial render
        requestAnimationFrame(() => {
            root.style.setProperty(
                '--theme-transition',
                'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease'
            );
        });
    }, [resolvedTheme, colorScheme]);

    // System theme preference detection
    const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
        setSystemPreference(e.matches ? 'dark' : 'light');
    }, [setSystemPreference]);

    useEffect(() => {
        // Detect initial system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

        // Listen for system theme changes
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [handleSystemThemeChange, setSystemPreference]);

    return null;
}
