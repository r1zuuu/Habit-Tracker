import { NextResponse } from 'next/server'
import { fetchAllHabits, postHabit, fetchUnique } from '@/services/HabitService'

export async function GET() {
  const habits = await fetchAllHabits()
  return NextResponse.json(habits)
}

export async function POST(request: Request) {
  const body = await request.json()
  const habit = await postHabit({ name: body.name, userId: body.userId })
  return NextResponse.json(habit)
}
