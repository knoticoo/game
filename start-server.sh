#!/bin/bash

# King's Choice Game Server Startup Script
# This script installs all dependencies and starts the server

set -e  # Exit on any error

echo "🎮 Starting King's Choice Game Server Setup..."
echo "=============================================="

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

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_warning "This script is running as root. Consider running as a regular user."
fi

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    print_error "package.json not found! Please run this script from the game directory."
    exit 1
fi

# Check for existing server on port 6000
print_status "Checking for existing server on port 6000..."
if lsof -Pi :6000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 6000 is already in use. Attempting to stop existing server..."
    pkill -f "react-scripts start" || true
    sleep 3
fi

# Check if Node.js is installed
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    print_status "Installing Node.js..."
    
    # Install Node.js via NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install nodejs -y
    
    if ! command -v node &> /dev/null; then
        print_error "Failed to install Node.js. Please install manually."
        exit 1
    fi
    print_success "Node.js installed successfully!"
else
    NODE_VERSION=$(node --version)
    print_success "Node.js is installed: $NODE_VERSION"
fi

# Check if npm is installed
print_status "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
else
    NPM_VERSION=$(npm --version)
    print_success "npm is installed: $NPM_VERSION"
fi

# Install/update dependencies
print_status "Installing/updating project dependencies..."
if [[ ! -d "node_modules" ]] || [[ "package.json" -nt "node_modules" ]]; then
    print_status "Installing dependencies with npm..."
    npm install
    print_success "Dependencies installed successfully!"
else
    print_success "Dependencies are up to date!"
fi

# Check for vulnerabilities
print_status "Checking for security vulnerabilities..."
if npm audit --audit-level=high 2>/dev/null; then
    print_success "No high-severity vulnerabilities found!"
else
    print_warning "Some vulnerabilities found. Consider running 'npm audit fix'"
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the server
print_status "Starting King's Choice game server..."
print_status "Server will run on: http://localhost:6000"
print_status "PWA features enabled - can be installed on mobile devices"

# Start server in background with nohup
nohup npm start > logs/server.log 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 5

# Check if server started successfully
if kill -0 $SERVER_PID 2>/dev/null; then
    print_success "Server started successfully!"
    echo "📊 Process ID: $SERVER_PID"
    echo "📝 Logs are being written to: logs/server.log"
    echo "🛑 To stop the server, run: kill $SERVER_PID or ./stop-server.sh"
    echo ""
    echo "🎮 Your King's Choice game is now running!"
    echo "🌐 Access it at: http://localhost:6000"
    echo "📱 PWA features enabled - can be installed on mobile devices"
    echo "🔄 Server will continue running even after SSH disconnection"
    
    # Save PID to file for easy stopping
    echo $SERVER_PID > server.pid
    
    # Show initial server output
    echo ""
    echo "📋 Initial server output:"
    echo "------------------------"
    if [[ -f "logs/server.log" ]]; then
        tail -20 logs/server.log
    fi
else
    print_error "Failed to start server!"
    if [[ -f "logs/server.log" ]]; then
        echo "Error logs:"
        cat logs/server.log
    fi
    exit 1
fi