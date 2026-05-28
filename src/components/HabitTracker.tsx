"use client";
import { useState, useEffect } from "react";

interface Habit{
    id: number;
    name: string;
}

export default function HabitTracker(){
    const [inputValue, setInputValue] = useState("");
    const [habits, setHabits] = useState<Habit[]>([])

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const res = await fetch('/api/habits')
                const data = await res.json()
                setHabits(data)
            } catch(error){
                console.error("Błąd ładowania habitów", error)
            }
        }
        loadHabits()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = async () => {
        if(inputValue.trim() == ""){
            return
        }
        const res = await fetch('/api/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: inputValue, userId: 1 }),
        })
        const newHabit = await res.json()
        setHabits([...habits, newHabit])
        setInputValue("")
    }

    return(
        <div className="">
            <input className="border-4 rounded-xl border-blue-500" type="text" onChange={handleChange} value={inputValue}/>
            <button onClick={handleSubmit}>Submit</button>
            <ul>
                {habits.map(
                    (habit) =>
                    (
                        <li key={habit.id}>{habit.name}</li>
                    )
                )}
            </ul>
        </div>
    )
}
