import { generateFrameHTML } from "@/app/actions";
import { NextResponse } from "next/server";
import { getAsset } from "@/app/actions";
import { createImageURL } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const asset = await getAsset(params.id);
  if (!asset) {
    return new NextResponse(
      generateFrameHTML({
        inputText: "Not found",
        imageSrc: "https://frame.frog.fm/og.png",
      })
    );
  }

  return new NextResponse(
    generateFrameHTML({
      inputText: asset.details.name,
      imageSrc: createImageURL(asset.details.imageIPFS ?? asset.details.imageURL) ?? "https://frame.frog.fm/og.png",
    })
  );
}
