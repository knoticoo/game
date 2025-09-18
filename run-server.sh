#!/bin/bash

# King's Choice Game - Persistent Server Script
# This script runs the game server in the background and keeps it running even after SSH disconnection

echo "🎮 Starting King's Choice Game Server..."
echo "======================================"

# Kill any existing React development server on port 6000
echo "🔄 Checking for existing server on port 6000..."
if lsof -Pi :6000 -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  Found existing server on port 6000. Stopping it..."
    pkill -f "react-scripts start" || true
    sleep 3
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server in the background using nohup
echo "🚀 Starting King's Choice game server in background..."
echo "🌐 Game will be available at: http://localhost:6000"
echo "📱 PWA features enabled - can be installed on mobile devices"
echo "🔄 Server will continue running even after SSH disconnection"
echo ""

# Use nohup to run the server in background and redirect output to log file
nohup npm run start > server.log 2>&1 &

# Get the process ID
SERVER_PID=$!

# Save PID to file for easy management
echo $SERVER_PID > server.pid

echo "✅ Server started successfully!"
echo "📊 Process ID: $SERVER_PID"
echo "📝 Logs are being written to: server.log"
echo "🛑 To stop the server, run: kill $SERVER_PID or ./stop-server.sh"
echo ""

# Show initial logs
echo "📋 Initial server output:"
sleep 5
tail -n 20 server.log

echo ""
echo "🎮 Your King's Choice game is now running!"
echo "🌐 Access it at: http://localhost:6000"
echo "======================================"