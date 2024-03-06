import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Next Issue Tracker",
  description:
    "A production grade issue tracker built with Next.js and Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.variable}>
        <Theme appearance="light">
          <NavBar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
