"use client";

import { createImageURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Card({ asset }: { asset: any }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [abort, setAbort] = useState(false);
  const controller = new AbortController();

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://chainstores.vercel.app/cast/${asset.id}`
    );
    if (buttonRef.current) {
      buttonRef.current.innerText = "Copied!";
      const timer = setTimeout(() => {
        buttonRef.current!.innerText = "Share on Warpcast";
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
    return;
  };

  return (
    <div className="flex flex-col w-full h-max gap-3 p-2 rounded-xl bg-white sm:max-w-[20rem]">
      <img
        className="flex w-full h-[20rem] rounded-lg"
        src={createImageURL(asset.details.imageIPFS ?? asset.details.imageURL)}
        alt={""}
      />
      <div className="flex flex-col w-full gap-2 items-center justify-between">
        <div className="flex w-full text-xl font-bold">
          {asset.details.name ?? "###"}
        </div>
        <Button
          className="flex w-full items-center justify-center bg-black text-white py-6 rounded-lg"
          onClick={copyLink}
          ref={buttonRef}
        >
          Share on Warpcast
        </Button>
      </div>
    </div>
  );
}
