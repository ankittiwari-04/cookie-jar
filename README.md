# 🍪 Cookie Jar — Decentralized Micro-Tipping Protocol

> **Built for the Cookie Chain Ecosystem**  
> *A high-performance, low-friction micro-donations & community funding protocol powered by Solana / SVM, Anchor, and Next.js 16.*

---

## 🔗 Submission Links

* **Live dApp URL:** [https://app-phi-sandy-87.vercel.app](https://app-phi-sandy-87.vercel.app)
* **GitHub Repository:** [https://github.com/ankittiwari-04/cookie-jar](https://github.com/ankittiwari-04/cookie-jar)
* **X (Twitter) Demo Thread:** [https://x.com/tiwariankit04/status/2102309121945190798?s=20)

---

## 🌟 Overview & Features

**Cookie Jar** brings seamless micro-tipping and crowd-grant functionality to Cookie Chain. Whether supporting ecosystem developers, funding open-source initiatives, or rewarding meme creators, Cookie Jar ensures instant, transparent, and low-cost on-chain settlement.

### Key Capabilities

* **🎯 Interactive Campaign Jars:** Real-time funding goal tracking with visual progress indicators and dynamic state updates.
* **⚡ One-Click Micro-Tipping:** Instant preset tipping tiers (`0.001`, `0.01`, `0.1` $COOK) with dynamic transaction formatting.
* **🧾 Real-Time On-Chain Receipt Feed:** Live activity log detailing recent supporters, jar targets, and exact amounts transferred.
* **👛 Multi-Wallet Integration:** Native support for **Nightly Wallet** across Cookie Chain SVM networks.
* **🔒 Secure Vault Architecture:** Smart contract state managed using Program Derived Addresses (PDAs) for secure and isolated funds custody.

---

## 🏗️ System Architecture & Tech Stack

### Smart Contract / On-Chain Logic
* **Language:** Rust
* **Framework:** Anchor (Solana / SVM)
* **Storage:** Program Derived Address (PDA) Vault Accounts

### Frontend & Infrastructure
* **Framework:** Next.js 16 (App Router), React 19, TypeScript
* **Styling:** Tailwind CSS, Lucide Icons
* **Wallet Adapter:** `@solana/wallet-adapter-react` & **Nightly Wallet Adapter**
* **Deployment:** Vercel Edge Network

---

## 🌉 Cookie Chain Bridge Guide

To interact with Cookie Jar from external chains (Solana Devnet/Mainnet or EVM networks):

1. **Access the Official Bridge:** Head to the [Cookie Chain Bridge Portal](https://bridge.cookiechain.io).
2. **Connect Source Wallet:** Select Phantom, Nightly, or MetaMask.
3. **Bridge Assets:** Deposit your source tokens to receive equivalent $COOK / SOL on Cookie Chain.
4. **Configure Wallet:** Set your Nightly Wallet RPC to Cookie Chain / Localnet (`http://127.0.0.1:8899`).
5. **Start Tipping:** Open [Cookie Jar](https://app-phi-sandy-87.vercel.app) and support your favorite jars!

---

## ⚙️ Local Development & Setup Guide

### Prerequisites
* Rust & Cargo
* Solana CLI tools (`v1.18+`)
* Anchor CLI (`v0.30+`)
* Node.js (`v20+`) & npm

### 1. Clone & Install Dependencies
```bash
git clone [https://github.com/ankittiwari-04/cookie-jar.git](https://github.com/ankittiwari-04/cookie-jar.git)
cd cookie-jar
cd app && npm install
