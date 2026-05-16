#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env};

#[contract]
pub struct CircleFactory;

#[contractimpl]
impl CircleFactory {
    pub fn initialize(_env: Env, _admin: Address) {
        // One-time init logic
    }
}
