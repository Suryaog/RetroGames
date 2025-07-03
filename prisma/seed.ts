import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const games = [
  {
    name: 'tic-tac-toe',
    displayName: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game with 3D visual effects',
    category: 'Strategy',
    difficulty: 'easy',
  },
  {
    name: 'snake',
    displayName: 'Snake 3D',
    description: 'Guide the snake to eat food and grow longer',
    category: 'Arcade',
    difficulty: 'medium',
  },
  {
    name: 'tetris',
    displayName: 'Tetris 3D',
    description: 'Stack falling blocks to clear lines',
    category: 'Puzzle',
    difficulty: 'medium',
  },
  {
    name: 'breakout',
    displayName: 'Breakout 3D',
    description: 'Break all bricks with the bouncing ball',
    category: 'Arcade',
    difficulty: 'medium',
  },
  {
    name: 'pong',
    displayName: 'Pong 3D',
    description: 'Classic paddle game in stunning 3D',
    category: 'Sports',
    difficulty: 'easy',
  },
]

const users = [
  {
    email: 'player1@example.com',
    username: 'GameMaster',
    password: 'demo-password', // In real app, this would be hashed
  },
  {
    email: 'player2@example.com',
    username: 'RetroGamer',
    password: 'demo-password',
  },
  {
    email: 'player3@example.com',
    username: 'PixelHero',
    password: 'demo-password',
  },
]

async function main() {
  console.log('Start seeding...')

  // Create games
  for (const game of games) {
    await prisma.game.upsert({
      where: { name: game.name },
      update: {},
      create: game,
    })
  }

  // Create demo users
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  // Create some demo scores
  const createdGames = await prisma.game.findMany()
  const createdUsers = await prisma.user.findMany()

  const sampleScores = [
    { userId: createdUsers[0].id, gameId: createdGames[0].id, score: 1500 },
    { userId: createdUsers[1].id, gameId: createdGames[0].id, score: 1200 },
    { userId: createdUsers[2].id, gameId: createdGames[0].id, score: 900 },
    { userId: createdUsers[0].id, gameId: createdGames[1].id, score: 2500 },
    { userId: createdUsers[1].id, gameId: createdGames[1].id, score: 2100 },
    { userId: createdUsers[2].id, gameId: createdGames[2].id, score: 3200 },
  ]

  for (const score of sampleScores) {
    await prisma.gameScore.create({
      data: score,
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })