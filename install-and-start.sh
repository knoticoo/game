#!/bin/bash

# King's Choice Game - Install and Start Script
# This script installs dependencies and starts the development server on port 6000

echo "🎮 King's Choice Game - Setup Script"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Kill any existing React development server on port 6000
echo "🔄 Checking for existing server on port 6000..."
if lsof -Pi :6000 -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  Found existing server on port 6000. Stopping it..."
    pkill -f "react-scripts start" || true
    sleep 3
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Start the development server
echo "🚀 Starting King's Choice game on port 6000..."
echo "🌐 Game will be available at: http://localhost:6000"
echo "📱 PWA features enabled - can be installed on mobile devices"
echo ""
echo "Press Ctrl+C to stop the server"
echo "===================================="

# Start the server
npm run start