import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  await db.habit.deleteMany()
  await db.user.deleteMany()

  const [anna, piotr, marta] = await Promise.all([
    db.user.create({ data: { name: 'Anna Kowalska' } }),
    db.user.create({ data: { name: 'Piotr Nowak' } }),
    db.user.create({ data: { name: 'Marta Wiśniewska' } }),
  ])

  await db.habit.createMany({
    data: [
      { name: 'Poranny bieg', userId: anna.id },
      { name: 'Czytanie 30 minut', userId: anna.id },
      { name: 'Medytacja', userId: anna.id },
      { name: 'Siłownia', userId: piotr.id },
      { name: 'Zimny prysznic', userId: piotr.id },
      { name: 'Nauka angielskiego', userId: piotr.id },
      { name: 'Joga', userId: marta.id },
      { name: 'Dziennik wdzięczności', userId: marta.id },
      { name: 'Picie 2L wody', userId: marta.id },
      { name: 'Bez cukru', userId: marta.id },
    ],
  })

  const habits = await db.habit.findMany()
  console.log('Baza danych wypełniona pomyślnie!')
  console.log(`Użytkownicy: ${anna.name}, ${piotr.name}, ${marta.name}`)
  console.log(`Dodano ${habits.length} nawyków.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
