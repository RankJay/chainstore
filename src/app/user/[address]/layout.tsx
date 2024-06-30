import type { Metadata } from "next";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chainstore | Where the future trades",
  description:
    "A way to flex your nfts on warpcast!",
};

export default function UserPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-screen h-screen">
      <Header />
      {children}
      <Toaster />
    </main>
  );
}
