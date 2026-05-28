import { NextResponse } from "next/server";
import { fetchUnique } from "@/services/HabitService";

export async function GET(request: Request){
    const body = await request.json()
    const habit = await fetchUnique(Number(body.id))
    return NextResponse.json(habit)
}