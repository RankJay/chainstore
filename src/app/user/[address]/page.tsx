import { getUser, getUserAssetsFromDB } from "@/app/actions";
import Card from "@/components/card";
import HomePageContent from "@/components/home";
import SyncWallet from "@/components/sync-wallet";
import { Button } from "@/components/ui/button";
import { FileWarning, FileWarningIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { address: string };
}) {
  const assets = await getUserAssetsFromDB(params.address);
  if (assets.length === 0) {
    return (
      <main className="flex flex-col gap-3 items-center justify-center p-4 w-full h-full ">
        <div className="flex gap-3 w-full h-auto p-5 rounded-xl text-md text-white font-medium bg-black md:max-w-[33vw]">
          <FileWarningIcon className="max-sm:hidden" size={40} />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-3">Assets not found</h1>
            Hey there! Looks like either you haven&rsquo;t synced yet or no NFTs
            (ERC721s) are found in your wallet. If you think this is a mistake,
            try syncing again.<br/><br/>Please be mindful of the fact, that currently only a maximum of ~30 ERC721s can be indexed.
          </div>
        </div>
        <SyncWallet address={params.address} />
      </main>
    );
  }
  return (
    <main className="flex p-4 w-full h-full bg-neutral-200 overflow-x-hidden">
      <div className="flex flex-wrap w-full h-auto gap-3">
        {assets.map((asset: any, index: number) => {
          return <Card key={index} asset={asset} />;
        })}
      </div>
    </main>
  );
}
