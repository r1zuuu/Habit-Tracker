import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Habit {
    id: number;
    name: string;
}

export function useHabitTracker() {
    const queryClient = useQueryClient();
    const [inputValue, setInputValue] = useState("");
    const [idNote, setIdNote] = useState(0);
    const [habitWithId, setHabitWithId] = useState<Habit | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const { data: habits = [], isPending, error } = useQuery<Habit[]>({
        queryKey: ['habits'],
        queryFn: () => fetch('/api/habits').then(res => res.json())
    });

    const handleSubmit = async () => {
        if (inputValue.trim() === "") return;
        try {
            await fetch('/api/habits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: inputValue, userId: 1 }),
            });
            setInputValue("");
            queryClient.invalidateQueries({ queryKey: ['habits'] }); // odswieza liste habitow po uzyciu useQuery
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
        } catch (error) {
            console.error(`Błąd przy ładowaniu habitu o id ${idNote}`, error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`/api/habits/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            queryClient.invalidateQueries({ queryKey: ['habits'] }); // odswieza liste habitow po uzyciu useQuery
        } catch (error) {
            console.error(`Błąd przy usuwaniu habitu o id: ${id}`)
        }
    }

    const handleEdit = async (id: number) => {
        try {
            await fetch(`/api/habits/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editValue, userId: 1 }),
            });
            setEditingId(null);
            setEditValue("");
            queryClient.invalidateQueries({ queryKey: ['habits'] }); // odswieza liste habitow po uzyciu useQuery
        } catch (error) {
            console.error(`Błąd przy edycji habitu o id: ${id}`)
        }
    }

    return {
        inputValue,
        habits,
        habitWithId,
        editingId,
        editValue,
        isPending,
        error,
        setInputValue,
        setIdNote,
        setEditingId,
        setEditValue,
        handleSubmit,
        handleIdClick,
        handleDelete,
        handleEdit,
    };
}
