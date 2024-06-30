import {
  getAssetsDetails,
  getNFTMetadata,
  getUserAssets,
  getUserAssetsFromDB,
  setUserAssetToDB,
} from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  let nfts: any[] = [];

  const response = await getUserAssetsFromDB(body.address);
  if (response.length > 0) {
    return NextResponse.json(response);
  }

  const assets = await getUserAssets(body.address);
  if (assets) {
    const assetsDetails = await getAssetsDetails(body.address, assets);

    if (assetsDetails) {
      for (let asset of assetsDetails) {
        const response = await getNFTMetadata({
          tokenId: asset.asset.subGroupId,
          address: asset.asset.groupId,
        });
        if (response) {
          await setUserAssetToDB(body.address, {
            id: response.id.toString(),
            name: response.metadata.name,
            description: response.metadata.description,
            imageIPFS: response.metadata.image,
            imageURL: response.metadata.external_url,
            bgColor: response.metadata.background_color,
            attributes: response.metadata.attributes,
            owner: response.owner,
            tokenURI: response.tokenURI,
            type: response.type,
          });
        }
      }
    }

    nfts = await getUserAssetsFromDB(body.address);
  }

  return NextResponse.json(nfts);
}
