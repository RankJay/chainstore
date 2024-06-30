import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import localFont from 'next/font/local'

const Aeonik = localFont({
  src: './fonts/Aeonik-Regular.otf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Chainstore | Where the future trades",
  description: "A way to flex your nfts on warpcast!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Aeonik.className}>
        {children}
      </body>
    </html>
  );
}
