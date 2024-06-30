import { createThirdwebClient } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";
import { sql } from "@vercel/postgres";
import { base } from "thirdweb/chains";
import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { GenerateFrameHTML } from "@/lib/types";

export function generateFrameHTML(data: GenerateFrameHTML) {
  const payload: any = {};
  if (data.imageSrc) {
    payload.image = {
      src: data.imageSrc,
    };
  }
  if (data.inputText) {
    payload.input = {
      text: data.inputText,
    };
  }
  if (data.postUrl) {
    payload.postUrl = data.postUrl;
  }
  if (data.buttons) {
    payload.buttons = data.buttons;
  }
  return getFrameHtmlResponse({ ...payload });
}

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_CLIENT_SECRET!,
});

export async function getUser(address: string) {
  const { rows } = await sql`SELECT * from "user" where "address"=${address}`;
  return rows;
}

export async function getAsset(id: string) {
  try {
    const { rows } = await sql`SELECT * from "asset" where "id"=${id}`;
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserAssetsFromDB(address: string) {
  const user = await sql`SELECT * from "user" where "address"=${address}`;
  if (user.rows.length === 0) {
    return [];
  }

  const { rows } =
    await sql`SELECT * from "asset" WHERE "userId"=${user.rows[0].id}`;
  if (rows.length === 0) {
    return [];
  }
  return rows;
}

export async function setUserAssetToDB(address: string, asset: any) {
  const { rows } = await sql`SELECT * from "user" where "address"=${address}`;
  if (rows.length === 0) {
    await sql`INSERT INTO "user" ("address") VALUES (${address})`;
  }
  return await sql`INSERT INTO "asset" ("userId", "details") VALUES ((SELECT "id" from "user" where "address"=${address}), ${asset})`;
}

async function getCDPBalance(address: string, nextPageToken: string | null) {
  try {
    const response = await fetch(
      "https://api.developer.coinbase.com/rpc/v1/base/wmvMYxE7SqyXc3cS9hR_4cAoE2sH1mu8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "cdp_listBalances",
          params: [
            {
              address,
              pageToken: nextPageToken ?? "",
              pageSize: 10,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getCDPBalanceDetails(address: string, assetId: string) {
  try {
    const response = await fetch(
      "https://api.developer.coinbase.com/rpc/v1/base/wmvMYxE7SqyXc3cS9hR_4cAoE2sH1mu8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "cdp_listBalanceDetails",
          params: [
            {
              address,
              assetId,
              pageSize: 1,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserAssets(address: string) {
  try {
    let assets: any = [];
    let pageToken = null;

    loop: while (true) {
      const response = await getCDPBalance(address, pageToken);
      if (!response) {
        break loop;
      }
      if (response.result.balances.length) {
        response.result.balances.forEach((balance: any) => {
          if (balance.asset.type === "erc721") {
            assets.push(balance);
          }
        });
      }
      if (!response.result.nextPageToken) {
        break loop;
      }
      pageToken = response.result.nextPageToken;
    }

    return assets;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getAssetsDetails(address: string, assets: any[]) {
  try {
    let details: any = [];
    for (let asset of assets) {
      if (asset.asset.type === "erc721") {
        const response = await getCDPBalanceDetails(address, asset.asset.id);
        if (response?.result?.balances?.length) {
          details.push(response.result.balances[0]);
        }
      }
    }
    return await details;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getNFTMetadata({
  tokenId,
  address,
}: {
  tokenId: number;
  address: string;
}) {
  try {
    const nft = await getNFT({
      tokenId: BigInt(tokenId),
      contract: {
        address,
        client,
        chain: base,
      },
    });
    return nft;
  } catch (e) {
    console.error(e);
    return null;
  }
}
