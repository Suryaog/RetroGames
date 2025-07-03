import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const topScores = await prisma.gameScore.findMany({
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

    return NextResponse.json(topScores)
  } catch (error) {
    console.error('Fetch top scores error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}