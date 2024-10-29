import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/section/Nav";
import "./globals.css";
import Provider from "./providers/Provider";
import { ThemeProvider } from "next-themes";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Job Board",
  description: "The Job Board application is an interactive platform that aims to connect job seekers with employees in an efficient and targeted manner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav/>
        {/* <Provider>{children}</Provider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme='dark'
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Provider>
            <Nav />
            <main>{children}</main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
