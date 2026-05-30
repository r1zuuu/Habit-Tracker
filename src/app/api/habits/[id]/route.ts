import { NextResponse } from "next/server";
import { fetchUnique, deleteHabit, putHabit } from "@/services/HabitService";

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const habit = await fetchUnique(Number(id))
    return NextResponse.json(habit)
}
export async function DELETE( request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const habit = await deleteHabit(Number(id))
    return NextResponse.json(habit)
}
export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}){
    const {id} = await params
    const body = await request.json()
    const habit = await putHabit(Number(id), {name: body.name, userId: body.userId})
    return NextResponse.json(habit)
}