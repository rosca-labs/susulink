# SusuLink Architecture

SusuLink is a decentralized Rotating Savings and Credit Association (ROSCA) platform built on the Stellar network.

## System Overview

The system consists of three main layers:

1.  **On-Chain Layer (Soroban Smart Contracts)**:
    - **SusuCircle**: Logic for each savings circle (contributions, payouts, rotation).
    - **ContributionVault**: Escrow for USDC funds.
    - **PenaltyPool**: Logic for handling late fees and rewarding on-time members.
    - **CircleFactory**: Registry for deploying and tracking circles.

2.  **Backend Layer (Node.js/Express)**:
    - Provides a REST API for the frontend.
    - Mocks contract deployment for the prototype.
    - Stores metadata and invite codes in PostgreSQL (via Prisma).
    - Handles wallet authentication challenge/verify (SEP-10).

3.  **Frontend Layer (Next.js)**:
    - User dashboard for managing circles.
    - Wallet integration via Freighter.
    - Real-time updates and notifications.

## Data Flow

1.  **Creation**: User configures a circle -> Backend generates invite code -> (Future) Backend triggers contract deployment.
2.  **Joining**: User enters invite code -> Backend adds member record -> (Future) User signs join transaction on-chain.
3.  **Contribution**: User pays USDC -> (Future) On-chain vault receives funds -> Backend tracks status.
4.  **Payout**: Cycle completes -> (Future) Contract triggers payout -> User receives USDC.

## Security

- **Smart Contracts**: Funds are held in specialized vault contracts, not by the backend.
- **Authentication**: JWT-based auth linked to Stellar addresses via SEP-10 signature verification.