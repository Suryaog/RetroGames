#!/bin/bash

# 🎮 Retro Games 3D - Termux Setup Script
# This script will automatically set up the gaming platform on Termux

echo "🎮 Welcome to Retro Games 3D - Mobile Edition!"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}$1${NC}"
}

# Check if running on Termux
if [[ "$PREFIX" != *"com.termux"* ]]; then
    print_warning "This script is optimized for Termux but will work on other Linux systems too."
fi

print_header "🔧 Checking system requirements..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_status "Node.js not found. Installing Node.js..."
    if [[ "$PREFIX" == *"com.termux"* ]]; then
        pkg update && pkg install nodejs git -y
    else
        print_error "Please install Node.js manually and run this script again."
        exit 1
    fi
else
    print_success "Node.js is already installed: $(node --version)"
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not available. Please install Node.js properly."
    exit 1
else
    print_success "npm is available: $(npm --version)"
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    print_status "Git not found. Installing Git..."
    if [[ "$PREFIX" == *"com.termux"* ]]; then
        pkg install git -y
    else
        print_error "Please install Git manually and run this script again."
        exit 1
    fi
else
    print_success "Git is available: $(git --version)"
fi

print_header "📦 Installing dependencies..."

# Check if package.json exists (we're in the project directory)
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Install dependencies
print_status "Installing npm dependencies..."
if npm install; then
    print_success "Dependencies installed successfully!"
else
    print_error "Failed to install dependencies. Please check your internet connection."
    exit 1
fi

print_header "🚀 Starting the gaming platform..."

# Create a startup script
cat > start-game.sh << 'EOF'
#!/bin/bash
echo "🎮 Starting Retro Games 3D..."
echo "You can access it at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""
npm run dev
EOF

chmod +x start-game.sh

print_success "Setup completed successfully!"
echo ""
print_header "🎯 What's next?"
echo ""
echo "1. To start the gaming platform:"
echo "   ${GREEN}npm run dev${NC}"
echo "   OR"
echo "   ${GREEN}./start-game.sh${NC}"
echo ""
echo "2. Open your browser and go to:"
echo "   ${BLUE}http://localhost:3000${NC}"
echo ""
echo "3. Create an account and start playing!"
echo ""

# Ask if user wants to start now
echo -n "Would you like to start the gaming platform now? (y/n): "
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_header "🎮 Launching Retro Games 3D..."
    echo "Access your gaming platform at: http://localhost:3000"
    echo "Press Ctrl+C to stop"
    echo ""
    exec npm run dev
else
    print_status "You can start the platform anytime with: npm run dev"
    echo ""
    print_success "Happy gaming! 🎮"
fi