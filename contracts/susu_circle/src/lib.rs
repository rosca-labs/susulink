#![no_std]
#![allow(clippy::too_many_arguments)]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Config,
    Admin,
    UsdcToken,
    VaultContract,
    PenaltyContract,
    Status,
    Members,
    InviteCode,
    PayoutQueue,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum PayoutOrderType {
    RandomDraw,
    FixedQueue,
    BidAuction,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum CircleStatus {
    Forming,
    Active,
    Completed,
    Dissolved,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CircleConfig {
    pub name: String,
    pub member_count: u32,
    pub contribution_amount: i128,
    pub frequency_days: u64,
    pub payout_order: PayoutOrderType,
    pub penalty_rate_bps: u32,
    pub created_at: u64,
    pub creator: Address,
    pub auto_renew: bool,
}

#[contract]
pub struct SusuCircleContract;

#[contractimpl]
impl SusuCircleContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        usdc_token: Address,
        _vault_contract: Address,
        _penalty_contract: Address,
        name: String,
        member_count: u32,
        contribution_amount: i128,
        frequency_days: u64,
        payout_order: PayoutOrderType,
        penalty_rate_bps: u32,
        auto_renew: bool,
        _invite_code: String,
    ) {
        if env.storage().instance().has(&DataKey::Config) {
            panic!("Already initialized");
        }

        if !(2..=20).contains(&member_count) {
            panic!("Member count must be between 2 and 20");
        }

        let config = CircleConfig {
            name,
            member_count,
            contribution_amount,
            frequency_days,
            payout_order,
            penalty_rate_bps,
            created_at: env.ledger().timestamp(),
            creator: admin.clone(),
            auto_renew,
        };

        env.storage().instance().set(&DataKey::Config, &config);
        env.storage()
            .instance()
            .set(&DataKey::Status, &CircleStatus::Forming);
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::UsdcToken, &usdc_token);

        let members: Vec<Address> = Vec::new(&env);
        env.storage().instance().set(&DataKey::Members, &members);
    }

    pub fn join_circle(env: Env, member: Address) {
        member.require_auth();

        let mut status: CircleStatus = env.storage().instance().get(&DataKey::Status).unwrap();
        if status != CircleStatus::Forming {
            panic!("Circle is not in Forming state");
        }

        let config: CircleConfig = env.storage().instance().get(&DataKey::Config).unwrap();
        let mut members: Vec<Address> = env.storage().instance().get(&DataKey::Members).unwrap();

        if members.len() >= config.member_count {
            panic!("Circle is full");
        }

        if members.contains(&member) {
            panic!("Already a member");
        }

        members.push_back(member);
        env.storage().instance().set(&DataKey::Members, &members);

        if members.len() == config.member_count {
            status = CircleStatus::Active;
            env.storage().instance().set(&DataKey::Status, &status);
        }
    }

    pub fn get_config(env: Env) -> CircleConfig {
        env.storage().instance().get(&DataKey::Config).unwrap()
    }

    pub fn get_status(env: Env) -> CircleStatus {
        env.storage().instance().get(&DataKey::Status).unwrap()
    }

    pub fn get_members(env: Env) -> Vec<Address> {
        env.storage().instance().get(&DataKey::Members).unwrap()
    }
}
