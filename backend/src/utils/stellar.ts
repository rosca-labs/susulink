/**
 * Converts a human-readable amount (e.g., 100.50 USDC) to stroops (BigInt).
 * Stellar uses 7 decimal places for its native and asset balances.
 */
export function toStroops(amount: number | string): bigint {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return BigInt(Math.round(num * 10_000_000));
}

/**
 * Converts stroops (BigInt) to a human-readable number.
 */
export function fromStroops(stroops: bigint | string | number): number {
  const val = typeof stroops === "string" ? BigInt(stroops) : BigInt(stroops);
  return Number(val) / 10_000_000;
}