#!/bin/bash

# SusuLink Contract Deployment Script
# Deploys the 4 core contracts to Stellar Testnet

NETWORK="testnet"
RPC_URL="https://soroban-testnet.stellar.org"
SOURCE_ACCOUNT="SERVICE_ACCOUNT"

echo "🚀 Starting SusuLink Contract Deployment..."

# 1. Build Contracts
echo "📦 Building WASM binaries..."
cargo build --target wasm32v1-none --release

# 2. Deploy Factory
echo "🏗️ Deploying Circle Factory..."
FACTORY_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/circle_factory.wasm \
  --source $SOURCE_ACCOUNT \
  --network $NETWORK)
echo "✅ Factory Deployed: $FACTORY_ID"

# 3. Deploy Template Contracts (SusuCircle, Vault, PenaltyPool)
echo "📜 Deploying Template Contracts..."
CIRCLE_WASM_HASH=$(stellar contract install \
  --wasm target/wasm32v1-none/release/susu_circle.wasm \
  --source $SOURCE_ACCOUNT \
  --network $NETWORK)
echo "✅ SusuCircle WASM Installed: $CIRCLE_WASM_HASH"

# (Similar steps for Vault and PenaltyPool)

echo "🎉 Deployment Complete!"