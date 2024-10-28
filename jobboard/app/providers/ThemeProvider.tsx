"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PropsWithChildren } from "react";

type Props = {
    children: React.ReactNode;
    attribute: string;
    defaultTheme: string;
    enableSystem: boolean;
    disableTransitionOnChange: boolean;
}

export default function ThemeProvider({ children }: Props) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
        </NextThemesProvider>
    );
}
