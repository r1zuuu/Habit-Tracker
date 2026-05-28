import { NextResponse } from "next/server";
import { fetchUnique } from "@/services/HabitService";

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const habit = await fetchUnique(Number(id))
    return NextResponse.json(habit)
}