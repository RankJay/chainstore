"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SplineIcon } from "lucide-react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export default function SyncWallet({ address }: { address: string }) {
  const [syncing, setSyncing] = useState(false);
  const router = useRouter();
  const sdk = new CoinbaseWalletSDK({
    appName: "Chainstore | Where the future trades",
    appChainIds: [8453],
  });
  
  const provider = sdk.makeWeb3Provider({ options: "all" });

  const syncWallet = async () => {
    setSyncing(true);
    const fetchSync = await fetch("/api/sync", {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    router.refresh();
    setSyncing(false);
  };

  useEffect(() => {
    provider.request({ method: "eth_accounts" }).then((account: any) => {
      if (account.length) {
        if (!account.includes(address)) {
          router.push(`/user/${account[0]}`);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Button
      className="w-full h-12 text-black font-bold bg-[#39FF14] hover:bg-[#20d600] md:max-w-[33vw]"
      style={{
        fontSize: "1.25rem",
      }}
      disabled={syncing}
      onClick={syncWallet}
    >
      {syncing ? <>Syncing...</> : <>Sync now</>}
    </Button>
  );
}
