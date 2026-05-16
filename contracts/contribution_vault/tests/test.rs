use contribution_vault::{ContributionVault, ContributionVaultClient};
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{Address, Env};

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register(ContributionVault, ());
    let client = ContributionVaultClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let circle = Address::generate(&env);
    let token = Address::generate(&env);

    client.initialize(&admin, &circle, &token);
}
