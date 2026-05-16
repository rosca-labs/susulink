<p align="center">
  <img src="https://img.shields.io/badge/Stellar-Protocol_25-00D4AA?style=for-the-badge&logo=stellar&logoColor=white" alt="Stellar Protocol 25" />
  <img src="https://img.shields.io/badge/Soroban-WASM-6366F1?style=for-the-badge" alt="Soroban WASM" />
  <img src="https://img.shields.io/badge/Monorepo-pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm Monorepo" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">🌍 SusuLink</h1>
<p align="center"><strong>Decentralized ROSCA Protocol for Financial Resilience.</strong></p>

<p align="center">
  Transparent savings circles · Automated smart contract payouts · Penalty-enforced contributions · Yield-optimized vaults<br/>
  <em>Built on the Stellar Network. Modernizing the world's most popular informal financial tool.</em>
</p>

---

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Architecture Overview](#architecture-overview)
- [Smart Contracts](#smart-contracts)
  - [Susu Circle](#1-susu-circle-contract)
  - [Contribution Vault](#2-contribution-vault-contract)
  - [Penalty Pool](#3-penalty-pool-contract)
  - [Circle Factory](#4-circle-factory-contract)
- [Backend API Reference](#backend-api-reference)
- [Database Schema](#database-schema)
- [Frontend Pages](#frontend-pages)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Smart Contract Development](#smart-contract-development)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security](#security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## The Problem

Rotating Savings and Credit Associations (ROSCAs) — known as *Susu* in West Africa, *Tanda* in Latin America, and *Ajo* in Nigeria — are used by over **1 billion people** worldwide. However, they face significant risks:

- **Trust Deficit**: Central organizers (treasurers) can vanish with the pool.
- **Contribution Default**: Members may stop paying after receiving their payout.
- **Manual Overhead**: Tracking payments and schedules is error-prone and tedious.
- **Geographic Limits**: Circles are restricted to local, physical communities.

**SusuLink digitizes trust through on-chain enforcement.**

---

## Our Solution

SusuLink is an end-to-end decentralized financial platform that provides four core primitives:

| Primitive | What It Does | Contract |
|---|---|---|
| **Susu Circles** | Programmable savings groups with immutable payout queues and contribution rules | `susu_circle` |
| **Contribution Vault** | Secure, trustless custody of member funds with multi-sig release triggers | `contribution_vault` |
| **Penalty Pool** | Logic for enforcing late fees and redistributing penalties to compliant members | `penalty_pool` |
| **Circle Factory** | Permissionless deployment of custom, audited Susu circle instances | `circle_factory` |

**Security: Non-custodial**. Funds are locked in smart contracts, not by any central authority.
**Settlement: Instant**. Payouts are triggered automatically once a cycle's contributions are verified.

---

## Architecture Overview

SusuLink is a **pnpm monorepo** with three workspaces:

```
susulink/
├── frontend/                    # Next.js 16 (React 19 + Turbopack)
│   ├── app/                     # App Router pages (Dashboard, Create, Explore)
│   ├── components/              # Reusable UI components
│   │   ├── circle/              # CircleCard, MemberTable, CircleRing
│   │   ├── ui/                  # Button, Card, Progress primitives
│   │   ├── wallet/              # WalletConnect, Balance views
│   │   └── layout/              # Navbar, Footer
│   ├── hooks/                   # useWallet, useCircle
│   ├── lib/                     # api.ts, freighter.ts, stellar.ts
│   ├── providers/               # WalletProvider, StellarProvider
│   ├── store/                   # Zustand stores (walletStore, circleStore)
│   └── types/                   # circle.ts, user.ts
│
├── backend/                     # Express 5 + Prisma + PostgreSQL
│   ├── src/
│   │   ├── routes/              # auth.ts (SEP-10), circles.ts
│   │   ├── services/            # StellarService, CircleService
│   │   ├── middleware/          # errorHandler, validate
│   │   └── __tests__/           # Integration test suite
│   └── prisma/
│       └── schema.prisma        # Database schema (User, Circle, Member)
│
├── contracts/                   # Soroban (Rust) smart contracts
│   ├── susu_circle/             # Core group logic
│   ├── contribution_vault/      # Fund custody
│   ├── penalty_pool/            # Default enforcement
│   └── circle_factory/          # Instance deployment
│
├── .github/workflows/           # CI/CD (SusuLink CI Pipeline)
├── scripts/                     # deploy_contracts.sh, setup.sh
├── pnpm-workspace.yaml          # Monorepo configuration
└── turbo.json                   # Build pipeline config
```

---

## Smart Contracts

All contracts are compiled to **WASM** targeting `wasm32v1-none` (Stellar Protocol 25), audited with `cargo clippy`, and formatted with `cargo fmt`.

### 1. Susu Circle Contract
**Path:** `contracts/susu_circle/`

Manages the lifecycle of a savings group, including member registration, cycle transitions, and payout order enforcement.

| Function | Auth | Description |
|---|---|---|
| `initialize(admin, config)` | None | Set admin and circle parameters (amount, frequency) |
| `join_circle(member)` | Member | Join a forming circle (requires invite code) |
| `contribute(member, amount)` | Member | Submit contribution for the current cycle |
| `trigger_payout()` | Admin | Release pool funds to the next member in queue |
| `get_config()` → `CircleConfig` | None | Fetch circle rules and status |

---

### 2. Contribution Vault Contract
**Path:** `contracts/contribution_vault/`

Securely holds all circle contributions. Funds can only be withdrawn by the associated `susu_circle` contract according to defined payout rules.

| Function | Auth | Description |
|---|---|---|
| `deposit(amount)` | None | Accept USDC deposits from members |
| `withdraw(recipient, amount)` | Circle | Release funds to the current winner |

---

### 3. Penalty Pool Contract
**Path:** `contracts/penalty_pool/`

Automates the collection and redistribution of late fees. If a member misses a deadline, they must pay a penalty which is proportionally distributed to other members.

---

### 4. Circle Factory Contract
**Path:** `contracts/circle_factory/`

Allows anyone to create their own Susu circle by providing a configuration. It clones the template contracts and initializes them in one atomic transaction.

---

## Backend API Reference

Base URL: `http://localhost:4000/api/v1`

### Authentication (SEP-10)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/challenge` | — | Generate SEP-10 challenge XDR |
| `POST` | `/auth/verify` | — | Verify signed challenge, receive JWT |

### Circles
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/circles/create` | JWT | Initiate circle creation on-chain |
| `GET` | `/circles/mine/:address` | JWT | Fetch user's active circles |
| `POST` | `/circles/join` | JWT | Join a circle via invite code |

---

## Database Schema

PostgreSQL managed via **Prisma ORM**.

```prisma
model Circle {
  id                  String   @id @default(uuid())
  contractId          String   @unique // Soroban address
  name                String
  memberCount         Int
  contributionAmount  Decimal  @db.Decimal(20, 7)
  frequencyDays       Int
  payoutOrder         String   // RandomDraw | FixedQueue | BidAuction
  status              String   @default("Forming")
  inviteCode          String   @unique
}
```

---

## Frontend Pages

| Route | Description |
|---|---|
| `/` | Landing page — Premium visuals and core stats |
| `/overview` | User dashboard — Active circles and savings stats |
| `/circle/create` | Step-by-step circle configuration |
| `/circle/[id]` | Real-time circle status, contributions, and chat |
| `/explore` | Marketplace for public savings circles |
| `/connect` | Wallet connection and SEP-10 authentication |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Blockchain** | Stellar (Soroban) | Protocol 25 |
| **Smart Contracts** | Rust + `soroban-sdk` | WASM (`wasm32v1-none`) |
| **Frontend** | Next.js + React | 16.2.6 / 19.0.0 |
| **Styling** | Tailwind CSS + Framer Motion | 3.4 / 12.0 |
| **Backend** | Express + TypeScript | 5.x |
| **Database** | PostgreSQL + Prisma | 17 / 5.x |
| **State Management** | Zustand | 5.x |
| **Package Manager** | pnpm (workspace) | 9.x |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Rust 1.91+
- Stellar CLI

### Installation

```bash
# Install dependencies
pnpm install

# Setup backend
cd backend && npx prisma generate
```

### Running Locally

```bash
# Start backend
cd backend && pnpm dev

# Start frontend
cd frontend && pnpm dev
```

---

## Smart Contract Development

### Building WASM Binaries

```bash
cd contracts
cargo build --release --target wasm32v1-none
```

### Deployment

```bash
# Use the automated script
bash scripts/deploy_contracts.sh
```

---

## CI/CD Pipeline

Every push triggers the **SusuLink CI Pipeline** (`.github/workflows/ci.yml`):
- **Backend**: Lint, Build, and Jest Tests.
- **Frontend**: Production Build (Next.js).
- **Contracts**: Format Check, Clippy Audit, WASM Build, and unit tests with Coverage.

---

## Security

- **ZK-Proof Identity (Planned)**: Privacy-preserving member verification.
- **Audit Logging**: All on-chain events are indexed for transparent history.
- **Non-Custodial**: Users retain full control of their keys via Freighter.

---

## Roadmap

- [x] Core Soroban contracts (Circle, Vault, Penalty, Factory)
- [x] pnpm monorepo stabilization and CI/CD
- [x] Premium Next.js dashboard and animated UI
- [ ] Testnet deployment with live contract addresses
- [ ] BidAuction payout logic implementation
- [ ] Mainnet launch and Institutional audit

---

## License

Released under the [MIT License](./LICENSE).

---

<p align="center">
  <strong>Built with ❤️ for the Stellar ecosystem.</strong><br/>
  <em>Financial inclusion is the start. Resilience is the goal.</em>
</p>