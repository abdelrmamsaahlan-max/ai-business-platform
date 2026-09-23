import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "A/B·P — AI Business Platform",
    template: "%s | A/B·P",
  },
  description: "An AI operating layer for focused businesses: intelligence, workflows, automation, and business context in one workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}