import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";

import { Container, Theme } from "@radix-ui/themes";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "./NavBar";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Theme appearance="light">
          <NavBar />
          <Container>
            <main className="p-5">{children}</main>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
