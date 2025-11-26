#!/bin/bash

# 🎮 Quick Mobile Start - Retro Games 3D

clear
echo "🎮 Retro Games 3D - Mobile Edition"
echo "=================================="
echo ""
echo "🚀 Starting gaming platform..."
echo "📱 Open your browser and go to: http://localhost:3000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project directory"
    exit 1
fi

# Start the development server
npm run dev