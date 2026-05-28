"use client";
import { useHabitTracker } from "@/hooks/useHabitTracker";

export default function HabitTracker() {
    const { inputValue, habits, habitWithId, setInputValue, setIdNote, handleSubmit, handleIdClick } = useHabitTracker();

    return (
        <div className="">
            <input
                className="border-4 rounded-xl border-blue-500"
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
            />
            <button onClick={handleSubmit}>Dodaj habit</button>
            <ul>
                {habits.map((habit) => (
                    <li key={habit.id}>{habit.name}</li>
                ))}
            </ul>
            <div>Enter the note id</div>
            <input
                type="number"
                onChange={(e) => setIdNote(Number(e.target.value))}
            />
            <button onClick={handleIdClick}>Szukaj po ID</button>
            {habitWithId && <div key={habitWithId.id} className="text-white">{habitWithId.name}</div>}
        </div>
    );
}
