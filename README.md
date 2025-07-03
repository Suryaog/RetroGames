# 🎮 Retro Games 3D - Mobile Termux Edition

A stunning 3D web-based gaming platform featuring 25+ classic games with modern graphics, user authentication, leaderboards, and responsive design. **Optimized for Mobile Termux!**

## ✨ Features

### 🎯 Games Collection
- **25+ Classic Games** including Tic Tac Toe, Snake, Tetris, Breakout, Pong, Space Invaders, and more
- **3D Graphics** powered by Three.js for immersive visual experience
- **Responsive Design** optimized for both desktop and mobile devices
- **Progressive Difficulty** with easy, medium, and hard levels

### 👤 User Management
- **User Registration & Login** with local storage
- **Profile Management** with avatar support
- **Session Management** for persistent login state
- **Guest Mode** for playing without registration

### 🏆 Competitive Features
- **Global Leaderboards** for each game
- **Score Tracking** with detailed statistics
- **Real-time Updates** of scores and rankings

### 🎨 Design & UX
- **Purple & Black Theme** with neon accents
- **Cyberpunk Aesthetic** with glowing effects
- **Smooth Animations** using Framer Motion
- **Glass Morphism** UI elements
- **Custom Fonts** (Orbitron & Exo 2)

## 🚀 Termux Installation (Mobile)

### **Prerequisites**
- Android device with Termux installed
- Node.js 18+ installed in Termux

### **Install Node.js in Termux:**
```bash
# Update packages
pkg update && pkg upgrade

# Install Node.js and Git
pkg install nodejs git

# Verify installation
node --version
npm --version
```

### **Quick Setup Commands:**
```bash
# Clone and navigate to the project
git clone https://github.com/Suryaog/Gahsh.git
cd Gahsh

# Install dependencies
npm install
# OR with yarn:
# yarn install

# Start the gaming platform
npm run dev
# OR with yarn:
# yarn dev
```

### **Access Your Gaming Platform:**
Open your mobile browser and go to: http://localhost:3000

## 💻 Desktop Installation

### **With NPM:**
```bash
git clone https://github.com/Suryaog/Gahsh.git
cd Gahsh
npm install
npm run dev
```

### **With Yarn:**
```bash
git clone https://github.com/Suryaog/Gahsh.git
cd Gahsh
yarn install
yarn dev
```

## 🎮 Available Games

1. **Tic Tac Toe 3D** - Fully playable with score tracking
2. **Snake 3D** - Guide the snake to eat food and grow
3. **Tetris 3D** - Stack falling blocks to clear lines
4. **Breakout 3D** - Break bricks with a bouncing ball
5. **Pong 3D** - Classic paddle game
6. **Space Invaders** - Defend Earth from alien invasion
7. **Pac-Man 3D** - Navigate mazes and eat dots
8. **Frogger 3D** - Cross busy roads and rivers
9. **Asteroids 3D** - Destroy asteroids in space
10. **Memory Match** - Find matching pairs of cards
11. **Simon Says** - Repeat color and sound sequences
12. **Maze Runner** - Navigate through complex 3D mazes

*...and 13+ more games ready for implementation!*

## � Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Local Storage** - Data persistence (no database needed!)
- **Zustand** - State management

## 📱 Mobile Features

- **Touch Controls** - Optimized for mobile gaming
- **Responsive 3D** - Adapts to any screen size
- **Offline Capable** - Works without internet (after first load)
- **Local Data** - All user data stored locally
- **Fast Performance** - No database overhead

## 🎯 What You Can Do

1. **Browse Games** - Explore the game collection
2. **Play Immediately** - No setup required
3. **Create Account** - Register to save scores
4. **Compete** - View global leaderboards
5. **Track Progress** - Monitor your statistics

## 🛠️ Development

### **Available Scripts:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### **Add New Games:**
1. Create game component in `src/app/game/[game-name]/`
2. Add game metadata to `src/contexts/game-context.tsx`
3. Implement score submission using `useGame` hook

## 🌟 Why This Version?

- ✅ **No Database** - Uses local storage, perfect for Termux
- ✅ **Lightweight** - Minimal dependencies
- ✅ **Mobile Optimized** - Touch-friendly interface
- ✅ **Offline Ready** - Works without internet
- ✅ **Easy Setup** - Just clone and run!

## 🔧 Troubleshooting

### **Termux Issues:**
```bash
# If Node.js installation fails:
pkg install nodejs-lts

# If port 3000 is busy:
npm run dev -- -p 3001

# Clear npm cache:
npm cache clean --force
```

### **Performance Tips:**
- Close other apps while running
- Use stable WiFi for initial download
- Enable developer options on Android for better performance

## 📞 Support

- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**Ready to play? Start your retro gaming adventure on mobile!** 🚀🎮

Built with ❤️ for Mobile Termux Gaming
