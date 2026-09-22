"use client";

import React, { FC, ReactNode, useMemo, useEffect, useState } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import { clusterApiUrl } from "@solana/web3.js";

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  // Devnet RPC fallback prevents extension RPC handshake hangs
  const endpoint = useMemo(() => "https://rpc.cookiescan.io", []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wallets = useMemo(
    () => [
      new NightlyWalletAdapter(),
    ],
    []
  );

  if (!mounted) {
    return null;
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
