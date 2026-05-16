#![no_std]
#![allow(clippy::too_many_arguments)]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vec,
};

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

const CONFIG: Symbol = symbol_short!("CONFIG");
const STATUS: Symbol = symbol_short!("STATUS");
const MEMBERS: Symbol = symbol_short!("MEMBERS");
const ADMIN: Symbol = symbol_short!("ADMIN");
const TOKEN: Symbol = symbol_short!("TOKEN");

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
        if env.storage().instance().has(&CONFIG) {
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

        env.storage().instance().set(&CONFIG, &config);
        env.storage()
            .instance()
            .set(&STATUS, &CircleStatus::Forming);
        env.storage().instance().set(&ADMIN, &admin);
        env.storage().instance().set(&TOKEN, &usdc_token);

        let members: Vec<Address> = Vec::new(&env);
        env.storage().instance().set(&MEMBERS, &members);
    }

    pub fn join_circle(env: Env, member: Address) {
        member.require_auth();

        let mut status: CircleStatus = env.storage().instance().get(&STATUS).unwrap();
        if status != CircleStatus::Forming {
            panic!("Circle is not in Forming state");
        }

        let config: CircleConfig = env.storage().instance().get(&CONFIG).unwrap();
        let mut members: Vec<Address> = env.storage().instance().get(&MEMBERS).unwrap();

        if members.len() >= config.member_count {
            panic!("Circle is full");
        }

        if members.contains(&member) {
            panic!("Already a member");
        }

        members.push_back(member);
        env.storage().instance().set(&MEMBERS, &members);

        if members.len() == config.member_count {
            status = CircleStatus::Active;
            env.storage().instance().set(&STATUS, &status);
        }
    }

    pub fn get_config(env: Env) -> CircleConfig {
        env.storage().instance().get(&CONFIG).unwrap()
    }

    pub fn get_status(env: Env) -> CircleStatus {
        env.storage().instance().get(&STATUS).unwrap()
    }

    pub fn get_members(env: Env) -> Vec<Address> {
        env.storage().instance().get(&MEMBERS).unwrap()
    }
}
