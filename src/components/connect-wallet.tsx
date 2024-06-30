"use client";


import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConnectWallet() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [provider, setProvider] = useState<any>(null);
  
  const router = useRouter();

  const connectAccount = async () => {
    const addresses: string[] = await provider.request({
      method: "eth_requestAccounts",
    });
    if (addresses.length) {
      setIsLoggedIn(true);
    }
  };

  const disconnectAccount = async () => {
    await provider.disconnect();
    setIsLoggedIn(false);
    router.push("/");
  };

  useEffect(() => {
    const sdk = new CoinbaseWalletSDK({
      appName: "Chainstore | Where the future trades",
      appChainIds: [8453],
    });
    
    const web3 = sdk.makeWeb3Provider({ options: "all" });
    setProvider(web3);

    web3.request({ method: "eth_accounts" }).then((account: any) => {
      setIsLoggedIn(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex gap-2">
          <div className="size-10 rounded-full bg-blue-800"></div>
          <button
            className="size-10 flex items-center justify-center rounded-[1rem] bg-neutral-800 text-white font-semibold"
            onClick={disconnectAccount}
          >
            <LogOutIcon size={20} />
          </button>
        </div>
      ) : (
        <button
          className="w-auto rounded-[1rem] bg-neutral-800 px-4 py-2 text-white font-medium shadow hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          onClick={connectAccount}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}
