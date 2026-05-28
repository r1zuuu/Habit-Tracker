import { db } from '@/lib/db'
interface Habit {
    id: number,
    name: string,
    userId: number,
}
export async function fetchAllHabits() {
  return db.habit.findMany()
}
export async function fetchUnique(id: number){
    return db.habit.findUnique({where: {id}})
}
export async function postHabit(habit: Omit<Habit, 'id'>) {
  return db.habit.create({ data: habit })
}
export async function deleteHabit(id: number){
  return db.habit.delete({where : {id}})
}