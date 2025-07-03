import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // In a real app, you'd clear the session/JWT token
  return NextResponse.json({ message: 'Logged out successfully' })
}