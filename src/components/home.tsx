"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { useEffect, useState } from "react";

export default function HomePageSyncer() {
  const [provider, setProvider] = useState<any>(null);
  const router = useRouter();
  
  const connectAccount = async () => {
    const addresses: string[] = await provider.request({
      method: "eth_requestAccounts",
    });
    if (addresses.length) {
      router.push(`/user/${addresses[0]}`);
    }
  };

  useEffect(() => {
    const sdk = new CoinbaseWalletSDK({
      appName: "Chainstore | Where the future trades",
      appChainIds: [8453],
    });
    
    const web3 = sdk.makeWeb3Provider({ options: "all" });
    setProvider(web3);

    // web3.request({ method: "eth_accounts" }).then((account: any) => {
    //   if (account.length) {
    //     router.push(`/user/${account[0]}`);
    //   }
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Button
      className="h-14 mt-5 px-6 text-black font-bold rounded-2xl bg-[#39FF14] hover:bg-[#20d600]"
      style={{
        fontSize: "1.25rem",
      }}
      onClick={connectAccount}
    >
      Sync Your Wallet
    </Button>
  );
}
