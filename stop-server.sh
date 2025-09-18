#!/bin/bash

# King's Choice Game - Stop Server Script
# This script stops the background game server

echo "🛑 Stopping King's Choice Game Server..."
echo "======================================"

# Check if PID file exists
if [ -f "server.pid" ]; then
    SERVER_PID=$(cat server.pid)
    echo "📊 Found server process ID: $SERVER_PID"
    
    # Check if process is still running
    if ps -p $SERVER_PID > /dev/null; then
        echo "🔄 Stopping server process..."
        kill $SERVER_PID
        
        # Wait a moment for graceful shutdown
        sleep 3
        
        # Force kill if still running
        if ps -p $SERVER_PID > /dev/null; then
            echo "⚠️  Force stopping server..."
            kill -9 $SERVER_PID
        fi
        
        echo "✅ Server stopped successfully!"
    else
        echo "ℹ️  Server process not found (may have already stopped)"
    fi
    
    # Remove PID file
    rm server.pid
else
    echo "ℹ️  No PID file found. Checking for running processes..."
    
    # Kill any react-scripts processes
    pkill -f "react-scripts start" || true
    echo "✅ Any running React servers have been stopped"
fi

# Also kill any processes on port 6000
if lsof -Pi :6000 -sTCP:LISTEN -t >/dev/null; then
    echo "🔄 Killing processes on port 6000..."
    lsof -ti:6000 | xargs kill -9
    echo "✅ Port 6000 is now free"
fi

echo "🎮 King's Choice game server has been stopped"
echo "======================================"