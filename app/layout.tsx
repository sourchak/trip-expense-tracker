import type { Metadata } from "next";
import { Play } from "next/font/google";
import "./globals.css";

const play = Play({
  weight: ["400", "700"],
  preload: true,
  fallback: ["sans-serif"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Trip Expense Tracker",
  description: "Manage trip expenses and more"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={play.className}>
        {children}
      </body>
    </html>
  );
}
