import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/allTheTime/Nav";
import Footer from "@/components/allTheTime/Footer";
import "./globals.css";
import Provider from "./providers/Provider";
import { ThemeProvider } from "next-themes";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", //http://www.w3.org/2000/svg
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
        <div className="flex flex-col min-h-screen">
        {/* <Nav/> */}
        <ThemeProvider
          attribute="class"
          defaultTheme='dark'
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Provider>
            <Nav />
            <main className="flex-grow pb-10">{children}</main>
          </Provider>
        </ThemeProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
