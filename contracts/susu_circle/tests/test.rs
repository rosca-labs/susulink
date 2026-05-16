use soroban_sdk::testutils::Address as _;
use soroban_sdk::{Address, Env, String};
use susu_circle::{PayoutOrderType, SusuCircleContract, SusuCircleContractClient};

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register(SusuCircleContract, ());
    let client = SusuCircleContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let vault = Address::generate(&env);
    let penalty = Address::generate(&env);
    let name = String::from_str(&env, "Test Circle");
    let invite = String::from_str(&env, "ABCDEF");

    client.initialize(
        &admin,
        &token,
        &vault,
        &penalty,
        &name,
        &6,
        &100,
        &30,
        &PayoutOrderType::FixedQueue,
        &500,
        &false,
        &invite,
    );

    let config = client.get_config();
    assert_eq!(config.name, name);
    assert_eq!(config.member_count, 6);
    assert_eq!(config.contribution_amount, 100);
}
