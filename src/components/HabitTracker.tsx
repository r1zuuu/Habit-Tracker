"use client";
import { useHabitTracker } from "@/hooks/useHabitTracker";
import { Skeleton } from "@/components/ui/skeleton"
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
        isPending,
        error
    } = useHabitTracker();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
            <div className="max-w-lg mx-auto space-y-8">

                <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
                    Habit Tracker
                </h1>

                <div className="flex gap-2">
                    <input
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        type="text"
                        placeholder="Nowy habit..."
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                    >
                        Dodaj
                    </button>
                </div>
                {/* {isPending && 
                    <div className="flex w-full max-w-xs flex-col gap-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                }
                {error && <p>Błąd: {error.message}</p>} */}
                <ul className="space-y-2">
                    {habits.map((habit) => (
                        <li key={habit.id} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
                            {editingId === habit.id ? (
                                <div className="flex gap-2">
                                    <input
                                        autoFocus
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleEdit(habit.id)}
                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
                                    />
                                    <button
                                        onClick={() => handleEdit(habit.id)}
                                        className="text-sm text-zinc-100 bg-zinc-700 hover:bg-zinc-600 px-3 py-1.5 rounded-md transition-colors"
                                    >
                                        Zapisz
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="text-sm text-zinc-500 hover:text-zinc-300 px-2 py-1.5 transition-colors"
                                    >
                                        Anuluj
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-100">{habit.name}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => {
                                                setEditingId(habit.id);
                                                setEditValue(habit.name);
                                            }}
                                            className="text-sm text-zinc-400 hover:text-zinc-100 px-3 py-1 rounded-md hover:bg-zinc-800 transition-colors"
                                        >
                                            Edytuj
                                        </button>
                                        <button
                                            onClick={() => handleDelete(habit.id)}
                                            className="text-sm text-zinc-400 hover:text-red-400 px-3 py-1 rounded-md hover:bg-zinc-800 transition-colors"
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="border-t border-zinc-800 pt-6 space-y-3">
                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Szukaj po ID</p>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="ID habitu..."
                            onChange={(e) => setIdNote(Number(e.target.value))}
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                        <button
                            onClick={handleIdClick}
                            className="bg-zinc-800 text-zinc-100 px-4 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors"
                        >
                            Szukaj
                        </button>
                    </div>
                    {habitWithId && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100">
                            #{habitWithId.id} — {habitWithId.name}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
