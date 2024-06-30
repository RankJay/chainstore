import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const sdk = new CoinbaseWalletSDK({
  appName: "Chainstore | Where the future trades",
  appChainIds: [8453],
});

export const web3 = sdk.makeWeb3Provider({ options: "all" });
