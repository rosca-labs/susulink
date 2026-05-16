# SusuLink Smart Contracts

SusuLink uses a suite of Soroban smart contracts to manage savings circles, escrows, and penalties.

## 1. SusuCircle

The core logic contract for a single savings circle.

### Methods

- **`initialize`**: Sets up the circle configuration.
  - `admin: Address`
  - `usdc_token: Address`
  - `vault_contract: Address`
  - `penalty_contract: Address`
  - `name: String`
  - `member_count: u32`
  - `contribution_amount: i128` (in stroops)
  - `frequency_days: u64`
  - `payout_order: PayoutOrderType`
  - `penalty_rate_bps: u32`
  - `auto_renew: bool`
  - `invite_code: String`

- **`join_circle`**: Allows a user to join the circle.
  - `member: Address` (requires auth)
  - Transitions status from `Forming` to `Active` when full.

- **`get_config`**: Returns the `CircleConfig` struct.

- **`get_status`**: Returns the current `CircleStatus`.

- **`get_members`**: Returns the list of joined members.

## 2. ContributionVault

Secure escrow for USDC contributions.

## 3. PenaltyPool

Handles late fees and rewards.

## 4. CircleFactory

Deploys and tracks all SusuLink circles.