#!/bin/bash

# System Requirements Installation Script for King's Choice Game
# This script installs all system dependencies required to run the game

set -e  # Exit on any error

echo "🔧 Installing System Requirements for King's Choice Game..."
echo "========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}📦 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Update package lists
print_status "Updating package lists..."
sudo apt-get update

# Install essential packages
print_status "Installing essential system packages..."
sudo apt-get install -y curl wget git build-essential

# Install Node.js via NodeSource repository
print_status "Installing Node.js and npm..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    print_success "Node.js and npm installed successfully!"
else
    NODE_VERSION=$(node --version)
    print_success "Node.js already installed: $NODE_VERSION"
fi

# Verify installations
print_status "Verifying installations..."
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install additional useful packages (optional)
print_status "Installing additional useful packages..."
sudo apt-get install -y htop tree vim nano

# Install Python and pip (for any Python-based tools)
print_status "Installing Python and pip..."
sudo apt-get install -y python3 python3-pip

print_success "All system requirements installed successfully!"
echo ""
echo "🎮 You can now run the game server with:"
echo "   ./start-server.sh"
echo ""
echo "📋 Or install project dependencies and start manually:"
echo "   npm install"
echo "   npm start"