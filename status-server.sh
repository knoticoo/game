#!/bin/bash

# King's Choice Game - Server Status Script
# This script shows the current status of the game server

echo "📊 King's Choice Game Server Status"
echo "==================================="

# Check if PID file exists
if [ -f "server.pid" ]; then
    SERVER_PID=$(cat server.pid)
    echo "📋 Process ID: $SERVER_PID"
    
    # Check if process is running
    if ps -p $SERVER_PID > /dev/null; then
        echo "✅ Server Status: RUNNING"
        echo "🌐 URL: http://localhost:6000"
        
        # Show process info
        echo ""
        echo "📊 Process Information:"
        ps -p $SERVER_PID -o pid,ppid,cmd,etime,pcpu,pmem
        
        # Check port status
        if lsof -Pi :6000 -sTCP:LISTEN -t >/dev/null; then
            echo ""
            echo "🔌 Port 6000: LISTENING"
        else
            echo ""
            echo "⚠️  Port 6000: NOT LISTENING (server may be starting up)"
        fi
        
        # Show recent logs
        if [ -f "server.log" ]; then
            echo ""
            echo "📝 Recent Logs (last 10 lines):"
            echo "--------------------------------"
            tail -n 10 server.log
        fi
    else
        echo "❌ Server Status: NOT RUNNING (PID file exists but process not found)"
        echo "🧹 Cleaning up PID file..."
        rm server.pid
    fi
else
    echo "❌ Server Status: NOT RUNNING (no PID file found)"
    
    # Check if anything is running on port 6000
    if lsof -Pi :6000 -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Warning: Something else is using port 6000"
        echo "🔍 Port 6000 processes:"
        lsof -Pi :6000
    else
        echo "✅ Port 6000 is available"
    fi
fi

echo ""
echo "🛠️  Available Commands:"
echo "  ./run-server.sh    - Start the server in background"
echo "  ./stop-server.sh   - Stop the server"
echo "  ./status-server.sh - Show this status"
echo "==================================="