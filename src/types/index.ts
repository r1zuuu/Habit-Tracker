import { z } from "zod"


export interface Habit {
    id: number;
    name: string;
}

// interface habitWithUser extends Habit {
//     userName: string
// }


export const HabitSchema = z.object({
    name: z.string().min(3).max(20),
    userId: z.number()
})

export type CreateHabit = z.infer<typeof HabitSchema>