import { useState, useEffect } from "react";

interface Habit {
    id: number;
    name: string;
}

export function useHabitTracker() {
    const [inputValue, setInputValue] = useState("");
    const [habits, setHabits] = useState<Habit[]>([]);
    const [idNote, setIdNote] = useState(0);
    const [habitWithId, setHabitWithId] = useState<Habit | null>(null);

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const res = await fetch('/api/habits');
                const data = await res.json();
                setHabits(data);
            } catch (error) {
                console.error("Błąd ładowania habitów", error);
            }
        };
        loadHabits();
    }, []);

    const handleSubmit = async () => {
        if (inputValue.trim() === "") return;
        try {
            const res = await fetch('/api/habits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: inputValue, userId: 1 }),
            });
            const newHabit = await res.json();
            setHabits([...habits, newHabit]);
            setInputValue("");
        } catch (error) {
            console.error("Błąd dodawania habitu", error);
        }
    };

    const handleIdClick = async () => {
        if (idNote <= 0) return;
        try {
            const res = await fetch(`/api/habits/${idNote}`);
            const data = await res.json();
            setHabitWithId(data);
            console.log(data);
        } catch (error) {
            console.error(`Błąd przy ładowaniu habitu o id ${idNote}`, error);
        }
    };

    return {
        inputValue,
        habits,
        habitWithId,
        setInputValue,
        setIdNote,
        handleSubmit,
        handleIdClick,
    };
}
