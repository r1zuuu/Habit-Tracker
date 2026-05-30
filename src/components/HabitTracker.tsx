"use client";
import { useHabitTracker } from "@/hooks/useHabitTracker";

export default function HabitTracker() {
    const {
        inputValue,
        habits,
        habitWithId,
        editingId,
        editValue,
        setInputValue,
        setIdNote,
        setEditingId,
        setEditValue,
        handleSubmit,
        handleIdClick,
        handleDelete,
        handleEdit,
    } = useHabitTracker();

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
                    <div key={habit.id} className="flex flex-col">
                        {editingId === habit.id ? (
                            <>
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => handleEdit(habit.id)}>Zapisz</button>
                            </>
                        ) : (
                            <>
                                <li>{habit.name}</li>
                                <button onClick={() => {
                                    setEditingId(habit.id);
                                    setEditValue(habit.name);
                                }}>Edit habit</button>
                            </>
                        )}
                        <button onClick={() => handleDelete(habit.id)}>Delete habit</button>
                    </div>
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
