"use client";

import ConnectWallet from "./connect-wallet";
import { ChainstoreLogo } from "./icons";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between p-2 px-4">
      <div><ChainstoreLogo /></div>
      <div>
        <ConnectWallet />
      </div>
    </header>
  );
}
