import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // For demo purposes, return null (no session)
  // In a real app, you'd check the session/JWT token
  return NextResponse.json(null)
}