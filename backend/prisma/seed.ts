import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  //usuario de Alice
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: 'securepassword123',
      image: 'https://example.com/alice.jpg'

    },
  })
   //  Ingresos de Alice
  const income = await prisma.income.create({
    data: {
      amount: 5000,
      date: new Date('2025-07-01'),
      category: 'Salario',
      paymentMethod: 'Transferencia',
      description: 'Sueldo mensual'
    },
  })

  //  Gastos de Alice
  const expense = await prisma.expense.create({
    data: {
      amount: 250,
      date: new Date('2025-07-03'),
      category: 'Supermercado',
      paymentMethod: 'Efectivo',
      description: 'Compras de alimentos'
    },
  })

  console.log({ alice })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
