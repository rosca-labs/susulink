export type CircleStatus = 'Forming' | 'Active' | 'Completed' | 'Dissolved';
export type PayoutOrderType = 'RandomDraw' | 'FixedQueue' | 'BidAuction';

export interface CircleConfig {
  name: string;
  member_count: number;
  contribution_amount: bigint;
  frequency_days: number;
  payout_order: PayoutOrderType;
  admin: string;
  token: string;
  vault: string;
  penalty_pool: string;
}

export interface CircleMember {
  address: string;
  joined_at: number;
  contributions: number;
  payout_position: number;
  has_received_payout: boolean;
}