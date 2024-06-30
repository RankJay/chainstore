import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createImageURL(uri: string | null) {
  if (!uri) {
    return ""
  }
  if (uri.startsWith("ipfs://")) {
    return `https://gateway.ipfs.io/ipfs/${uri.slice(7)}`
  }

  if (uri.startsWith("ar://")) {
    return `https://arweave.net/${uri.slice(5)}`
  }
  if (uri.startsWith("https://")) {
    return uri
  }

  return uri
}
