import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Return user data (excluding password)
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      createdAt: user.createdAt,
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}