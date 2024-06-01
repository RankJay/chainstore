import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chainstore | Where the future trades",
  description: "Chainstore is a decentralized commerce platform for trading digital assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
