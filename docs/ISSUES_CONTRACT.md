# SusuLink — Smart Contract Issues (Stellar Drip Wave)

> Points: 100 = Trivial | 150 = Medium | 200 = High

---

## [Contract]: Implement `contribute` Function in SusuCircle #1

**Priority:** High | **Points:** 200 | **Labels:** `contract` `feature` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 12 Hours

### Description
The `contribute` function is missing from the SusuCircle contract. Members must be able to deposit their USDC contribution for the current cycle.

### Requirements
- Validate member is in the circle's member list.
- Validate circle is in `Active` status.
- Transfer `contribution_amount` of USDC from member to vault contract.
- Record contribution on-chain with cycle number and timestamp.
- Emit a `contributed` event.

### Definition of Done
- Passes `cargo test`, `cargo clippy`, `cargo fmt`.
- Integration test confirms USDC balance moves from member to vault.
- Branch: `feat/contribute-function`

---

## [Contract]: Implement `trigger_payout` Function in SusuCircle #2

**Priority:** High | **Points:** 200 | **Labels:** `contract` `feature` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 16 Hours

### Description
The payout trigger is not implemented. After all members contribute for a cycle, the designated recipient must receive the full pool.

### Requirements
- Only callable when all members have contributed for the current cycle.
- Determine recipient based on `PayoutOrderType` (FixedQueue = sequential, RandomDraw = RNG seed from ledger).
- Transfer the full pool amount from vault to recipient.
- Advance `current_cycle` counter.
- If last cycle, transition status to `Completed`.
- Emit `payout_triggered` event.

### Definition of Done
- Passes all cargo quality checks.
- Full test coverage for FixedQueue payout ordering.
- Branch: `feat/trigger-payout`

---

## [Contract]: Implement `BidAuction` Payout Order Logic #3

**Priority:** High | **Points:** 200 | **Labels:** `contract` `feature` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 20 Hours

### Description
The `BidAuction` payout variant allows members to bid for early payout slots. The highest bidder receives the payout earlier, with their bid distributed to others.

### Requirements
- Members submit bids (additional USDC above contribution amount).
- Bidding window defined as N ledgers after cycle starts.
- Highest bidder wins slot; bid amount redistributed proportionally.
- Fallback to FixedQueue if no bids are placed.

### Definition of Done
- Full auction lifecycle tested (open, bid, close, payout).
- Branch: `feat/bid-auction`

---

## [Contract]: Implement Late Contribution Penalty Enforcement #4

**Priority:** High | **Points:** 200 | **Labels:** `contract` `security` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`, `contracts/penalty_pool/src/lib.rs`
**Timeframe:** 12 Hours

### Description
Members who miss the contribution deadline must be penalized. The penalty pool contract must collect fees and redistribute them.

### Requirements
- Track per-cycle contribution deadlines using `frequency_days`.
- If a member misses the deadline, apply `penalty_rate_bps` on their contribution amount.
- Transfer penalty to `penalty_pool` contract.
- Mark member as `late` for the cycle.
- PenaltyPool must expose a `distribute` function to split penalties among compliant members.

### Definition of Done
- Late member penalized, compliant members rewarded proportionally.
- Branch: `feat/penalty-enforcement`

---

## [Contract]: Implement `ContributionVault` Deposit and Withdraw Logic #5

**Priority:** High | **Points:** 200 | **Labels:** `contract` `feature` `priority:high`
**Files:** `contracts/contribution_vault/src/lib.rs`
**Timeframe:** 10 Hours

### Description
The vault is a stub. It must securely hold USDC between contributions and payouts.

### Requirements
- `deposit(member, amount)`: Accept USDC transfer from members.
- `withdraw(recipient, amount)`: Only callable by the authorized `susu_circle` contract.
- Track total balance per circle.
- Reject unauthorized callers.

### Definition of Done
- Only authorized circle can call `withdraw`.
- Deposit/withdraw balance math is exact with no rounding errors.
- Branch: `feat/vault-deposit-withdraw`

---

## [Contract]: Implement `circle_factory` Permissionless Deployment #6

**Priority:** High | **Points:** 200 | **Labels:** `contract` `feature` `priority:high`
**Files:** `contracts/circle_factory/src/lib.rs`
**Timeframe:** 16 Hours

### Description
The factory contract should allow anyone to deploy a new `SusuCircle` instance with custom parameters.

### Requirements
- Accept all `CircleConfig` parameters.
- Deploy and initialize a new `susu_circle` contract instance.
- Store deployed contract addresses in factory's own storage.
- Emit `circle_created` event with contract ID and config.
- Return new contract address to caller.

### Definition of Done
- Factory test creates at least 3 circle instances with different configs.
- Branch: `feat/circle-factory`

---

## [Contract]: Add `CYCLE_INDEX` and `CONTRIBUTIONS` Storage Keys #7

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `enhancement` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 6 Hours

### Description
The contract has no on-chain tracking of which members contributed in which cycle.

### Requirements
- Add `CYCLE` storage key tracking current cycle number.
- Add per-cycle `CONTRIBUTIONS` map: `(cycle, member) -> bool`.
- Add helper `has_contributed(cycle, member) -> bool`.
- Add `get_cycle() -> u32` public function.

### Definition of Done
- Storage correctly tracks multi-cycle contribution state.
- Branch: `feat/cycle-contribution-tracking`

---

## [Contract]: Add `invite_code` Membership Gating #8

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `feature` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 6 Hours

### Description
Currently any address can call `join_circle`. Invite codes must gate access.

### Requirements
- Store hashed invite code in contract storage during `initialize`.
- `join_circle` must accept an `invite_code: String` parameter.
- Hash provided code and compare to stored hash.
- Reject if codes don't match.

### Definition of Done
- Test confirms unauthorized address cannot join without correct invite.
- Branch: `feat/invite-code-gating`

---

## [Contract]: Implement `dissolve_circle` Admin Function #9

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `feature` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 6 Hours

### Description
Admins must be able to dissolve a circle (e.g., if a member is unresponsive), triggering a pro-rata refund.

### Requirements
- Only callable by admin.
- Circle must be in `Forming` or `Active` state.
- Withdraw all funds from vault and return to contributing members proportionally.
- Set status to `Dissolved`.
- Emit `circle_dissolved` event.

### Definition of Done
- Members receive correct refund amounts.
- Branch: `feat/dissolve-circle`

---

## [Contract]: Emit Events for All State Transitions #10

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `enhancement` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 4 Hours

### Description
No events are currently emitted. Indexers and frontends need events to track circle activity.

### Requirements
- Emit `member_joined` when member joins.
- Emit `contribution_received` when member contributes.
- Emit `payout_triggered` on payout with recipient and amount.
- Emit `circle_completed` when all cycles finish.
- Use `env.events().publish(...)` with proper topic structure.

### Definition of Done
- All events verified in tests by reading `env.events()`.
- Branch: `feat/contract-events`

---

## [Contract]: Add `auto_renew` Cycle Restart Logic #11

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `feature` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 8 Hours

### Description
Circles with `auto_renew = true` should restart a new round automatically after completing all cycles.

### Requirements
- After final payout, if `auto_renew` is true, reset cycle counter.
- Reshuffle payout order for RandomDraw type.
- Keep member list intact.
- Emit `circle_renewed` event.

### Definition of Done
- Test validates circle restarts correctly after completing round.
- Branch: `feat/auto-renew`

---

## [Contract]: Add `update_admin` with Two-Step Transfer #12

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `security` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 4 Hours

### Description
Admin transfer should use a two-step accept pattern to prevent accidental lockout.

### Requirements
- `propose_admin(new_admin)` stores a pending admin.
- `accept_admin()` finalizes transfer when called by pending admin.
- Old admin remains in control until accepted.

### Definition of Done
- Test validates admin cannot be transferred without acceptance.
- Branch: `sec/two-step-admin`

---

## [Contract]: Implement `get_member_status` Query #13

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `feature` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 4 Hours

### Description
No per-member status query exists. Frontends and tests need to query individual member state.

### Requirements
- Return struct: `{ joined_at, payout_position, cycles_paid, cycles_late, has_received_payout }`.
- Efficient storage using persistent ledger entries per member.

### Definition of Done
- Correct data returned for multiple members in test.
- Branch: `feat/member-status-query`

---

## [Contract]: Add `RandomDraw` Verifiable Randomness #14

**Priority:** High | **Points:** 200 | **Labels:** `contract` `security` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 10 Hours

### Description
RandomDraw payout must not be gameable. Use ledger sequence as entropy source.

### Requirements
- Seed RNG from `env.ledger().sequence()` XOR'd with circle ID hash.
- Select winner from un-paid members list.
- Document why this is acceptable entropy for a ROSCA context.

### Definition of Done
- Cannot predict winner before payout ledger closes.
- Branch: `sec/verifiable-random-draw`

---

## [Contract]: Write Comprehensive Integration Tests for SusuCircle #15

**Priority:** High | **Points:** 200 | **Labels:** `contract` `testing` `priority:high`
**Files:** `contracts/susu_circle/tests/test.rs`
**Timeframe:** 16 Hours

### Description
Only `initialize` is tested. A full lifecycle test is required.

### Requirements
- Test full circle lifecycle: initialize → join (N members) → contribute (all) → payout.
- Test penalty for late member.
- Test unauthorized `join_circle` rejection.
- Test `dissolve_circle` refund amounts.
- Achieve >80% tarpaulin coverage.

### Definition of Done
- `cargo tarpaulin` reports ≥80% coverage on `susu_circle`.
- Branch: `test/susu-circle-lifecycle`

---

## [Contract]: Add `storage_bump` TTL Extension for Instance Data #16

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `maintenance` `priority:medium`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 4 Hours

### Description
Without TTL extension, instance storage entries expire and circle state is lost.

### Requirements
- Call `env.storage().instance().extend_ttl(...)` with appropriate ledger thresholds on every write.
- Use constants: `LIFETIME_THRESHOLD` and `BUMP_AMOUNT`.

### Definition of Done
- Storage entries never expire during active circle lifecycle.
- Branch: `feat/storage-ttl-bump`

---

## [Contract]: Write Tests for ContributionVault and PenaltyPool #17

**Priority:** Medium | **Points:** 150 | **Labels:** `contract` `testing` `priority:medium`
**Files:** `contracts/contribution_vault/tests/`, `contracts/penalty_pool/tests/`
**Timeframe:** 10 Hours

### Description
`contribution_vault` and `penalty_pool` have near-zero test coverage.

### Requirements
- Test deposit and unauthorized withdrawal rejection.
- Test penalty distribution to N compliant members.
- Achieve >70% tarpaulin coverage for both contracts.

### Definition of Done
- `cargo tarpaulin` confirms coverage targets met.
- Branch: `test/vault-penalty-coverage`

---

## [Contract]: Add `pause` / `unpause` Circuit Breaker #18

**Priority:** High | **Points:** 200 | **Labels:** `contract` `security` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`
**Timeframe:** 6 Hours

### Description
No emergency stop mechanism exists. A compromised oracle or critical bug could drain funds.

### Requirements
- Add `PAUSED` storage boolean.
- `pause(admin)` and `unpause(admin)` functions.
- All state-changing functions check `PAUSED` and panic if true.
- Emit `circle_paused` / `circle_unpaused` events.

### Definition of Done
- Contributions and payouts blocked while paused.
- Branch: `sec/circuit-breaker`

---

## [Contract]: Add Soroban Auth for All Mutating Functions #19

**Priority:** High | **Points:** 200 | **Labels:** `contract` `security` `priority:high`
**Files:** `contracts/susu_circle/src/lib.rs`, `contracts/contribution_vault/src/lib.rs`
**Timeframe:** 6 Hours

### Description
Ensure every state-mutating function has a proper `require_auth()` call with the correct signer.

### Requirements
- Audit all public `&mut` functions across all 4 contracts.
- Add missing `address.require_auth()` calls.
- Test that unauthorized callers are rejected.

### Definition of Done
- No mutating function is callable without proper auth in tests.
- Branch: `sec/auth-audit`

---

## [Contract]: Upgrade to `wasm32v1-none` and Validate Build #20

**Priority:** Medium | **Points:** 100 | **Labels:** `contract` `maintenance` `priority:medium`
**Files:** `contracts/Cargo.toml`, `scripts/deploy_contracts.sh`
**Timeframe:** 2 Hours

### Description
Ensure all build tooling is aligned on the `wasm32v1-none` target per Soroban Protocol 25.

### Requirements
- Verify `.cargo/config.toml` sets default build target to `wasm32v1-none`.
- Update all docs and scripts to reference correct target.
- CI build confirmed green.

### Definition of Done
- `cargo build --target wasm32v1-none --release` succeeds across all 4 contracts.
- Branch: `chore/wasm-target-upgrade`
