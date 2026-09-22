import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";

export const metadata = {
  title: "Cookie Jar | Cookie Chain cApp",
  description: "On-chain tipping and community vault on Cookie Chain (SVM)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
