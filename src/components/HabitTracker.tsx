"use client";
import { useState } from "react";

interface Habit{
    id: number;
    name: string;
}
export default function HabitTracker(){
    const [inputValue, setInputValue] = useState("");
    const [habits, setHabits] = useState<Habit[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = () => {
        setHabits([...habits, {id: Date.now(), name: inputValue}])
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
