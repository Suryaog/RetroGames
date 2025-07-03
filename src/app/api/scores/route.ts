import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { gameId, score, level, time, moves, gameData, userId } = await request.json()

    // For this demo, we'll use a simple user ID - in production you'd get this from session/JWT
    const demoUserId = userId || 'demo-user'

    // Ensure game exists
    let game = await prisma.game.findUnique({
      where: { name: gameId }
    })

    if (!game) {
      // Create game if it doesn't exist
      game = await prisma.game.create({
        data: {
          name: gameId,
          displayName: gameId.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          category: 'Classic',
          difficulty: 'medium',
        }
      })
    }

    // Create demo user if it doesn't exist
    let user = await prisma.user.findUnique({
      where: { id: demoUserId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: demoUserId,
          email: `demo-${Date.now()}@example.com`,
          username: `Player${Math.floor(Math.random() * 1000)}`,
          password: 'demo-password', // In real app, this would be hashed
        }
      })
    }

    // Create score entry
    const gameScore = await prisma.gameScore.create({
      data: {
        score,
        level,
        time,
        moves,
        gameData: gameData ? JSON.stringify(gameData) : null,
        userId: user.id,
        gameId: game.id,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          }
        },
        game: {
          select: {
            displayName: true,
            name: true,
          }
        }
      }
    })

    return NextResponse.json(gameScore)
  } catch (error) {
    console.error('Score submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameId = searchParams.get('gameId')
    const limit = parseInt(searchParams.get('limit') || '10')

    let scores

    if (gameId) {
      // Get scores for specific game
      scores = await prisma.gameScore.findMany({
        where: {
          game: {
            name: gameId
          }
        },
        orderBy: {
          score: 'desc'
        },
        take: limit,
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
            }
          },
          game: {
            select: {
              displayName: true,
              name: true,
            }
          }
        }
      })
    } else {
      // Get top scores across all games
      scores = await prisma.gameScore.findMany({
        orderBy: {
          score: 'desc'
        },
        take: limit,
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
            }
          },
          game: {
            select: {
              displayName: true,
              name: true,
            }
          }
        }
      })
    }

    return NextResponse.json(scores)
  } catch (error) {
    console.error('Fetch scores error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}