import { NextResponse } from 'next/server'
import { fetchAllHabits, postHabit } from '@/services/HabitService'
import { HabitSchema } from '@/types'

export async function GET() {
  const habits = await fetchAllHabits()
  return NextResponse.json(habits)
}

export async function POST(request: Request) {
  const body = HabitSchema.parse(await request.json())
  const habit = await postHabit({ name: body.name, userId: body.userId })
  return NextResponse.json(habit)
}
