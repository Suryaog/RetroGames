# 🎮 Retro Games 3D - Classic Games Collection

A stunning 3D web-based gaming platform featuring 25+ classic games with modern graphics, user authentication, leaderboards, and responsive design.

## ✨ Features

### 🎯 Games Collection
- **25+ Classic Games** including Tic Tac Toe, Snake, Tetris, Breakout, Pong, Space Invaders, Pac-Man, and more
- **3D Graphics** powered by Three.js for immersive visual experience
- **Responsive Design** optimized for both desktop and mobile devices
- **Progressive Difficulty** with easy, medium, and hard levels

### 👤 User Management
- **User Registration & Login** with secure authentication
- **Profile Management** with avatar support
- **Session Management** for persistent login state
- **Guest Mode** for playing without registration

### 🏆 Competitive Features
- **Global Leaderboards** for each game
- **Score Tracking** with detailed statistics
- **Achievement System** (coming soon)
- **Real-time Updates** of scores and rankings

### 🎨 Design & UX
- **Purple & Black Theme** with neon accents
- **Cyberpunk Aesthetic** with glowing effects
- **Smooth Animations** using Framer Motion
- **Glass Morphism** UI elements
- **Custom Fonts** (Orbitron & Exo 2)

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma** - Database ORM
- **SQLite** - Database (easily upgradeable to PostgreSQL)
- **bcryptjs** - Password hashing
- **NextAuth.js** - Authentication library

### State Management
- **React Context** - For global state
- **Zustand** - Lightweight state management
- **React Hot Toast** - Notifications

## 📱 Games Included

1. **Tic Tac Toe** - Classic 3x3 grid strategy game
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

*...and 13+ more games coming soon!*

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd retro-games-3d
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Database
```bash
# Initialize the database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Environment Variables
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth (optional, for production)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### For Players
1. **Browse Games** - Explore the game collection on the homepage
2. **Play as Guest** - Start playing immediately without registration
3. **Create Account** - Register to save scores and compete on leaderboards
4. **Track Progress** - View your statistics and rankings
5. **Compete** - Challenge other players on global leaderboards

### For Developers
1. **Add New Games** - Follow the game template structure
2. **Customize Themes** - Modify Tailwind configuration
3. **Extend API** - Add new endpoints in `/api` routes
4. **Database Changes** - Update Prisma schema and migrate

## 🎮 Game Development

### Adding a New Game
1. Create a new directory in `src/app/game/[game-name]/`
2. Add the game component with 3D elements
3. Implement score submission using the `useGame` hook
4. Add game metadata to the games list
5. Test and deploy

### Game Structure Example
```typescript
// src/app/game/my-game/page.tsx
'use client'

import { useGame } from '@/contexts/game-context'
import { useAuth } from '@/contexts/auth-context'

export default function MyGamePage() {
  const { submitScore } = useGame()
  const { user } = useAuth()

  // Game logic here
  const handleGameEnd = async (score: number) => {
    if (user) {
      await submitScore('my-game', score, { 
        /* additional metadata */ 
      })
    }
  }

  return (
    <div className="game-board">
      {/* Game UI */}
    </div>
  )
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
- **Netlify** - Build command: `npm run build`
- **Railway** - Supports PostgreSQL database
- **Heroku** - Add PostgreSQL addon

## 🔧 Configuration

### Database
- **Development**: SQLite (included)
- **Production**: PostgreSQL recommended
- **Migrations**: Use `npx prisma migrate dev`

### Customization
- **Colors**: Edit `tailwind.config.js`
- **Fonts**: Modify global CSS imports
- **3D Settings**: Adjust Three.js configurations

## 📊 Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  scores    GameScore[]
}

model Game {
  id          String   @id @default(cuid())
  name        String   @unique
  displayName String
  category    String
  difficulty  String
  scores      GameScore[]
}

model GameScore {
  id       String   @id @default(cuid())
  score    Int
  userId   String
  gameId   String
  user     User     @relation(fields: [userId], references: [id])
  game     Game     @relation(fields: [gameId], references: [id])
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-game`
3. Commit changes: `git commit -m 'Add new game: Space Shooter'`
4. Push to branch: `git push origin feature/new-game`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Core game platform
- [x] User authentication
- [x] Basic leaderboards
- [x] Responsive design
- [x] First 12 games

### Phase 2 (Coming Soon)
- [ ] Multiplayer support
- [ ] Achievement system
- [ ] Advanced 3D graphics
- [ ] Sound effects and music
- [ ] Mobile app (React Native)

### Phase 3 (Future)
- [ ] Tournament system
- [ ] Social features
- [ ] Game creation tools
- [ ] VR support
- [ ] AI opponents

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Join our Discord community
- Email: support@retrogames3d.com

## 🎉 Acknowledgments

- **Three.js Community** - For amazing 3D graphics capabilities
- **Next.js Team** - For the incredible React framework
- **Tailwind CSS** - For making styling enjoyable
- **Game Developers** - For inspiring classic game recreations

---

**Ready to play? Start your retro gaming adventure today!** 🚀

Built with ❤️ by the Retro Games 3D team 
