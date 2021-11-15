import { PrismaClient } from "@prisma/client"
import * as faker from "faker"

function generateUserData() {
  const firstName = faker.name.firstName(),
        lastName = faker.name.lastName(),
        userName = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`.replace(/[^a-z\.]+/, "")
  return {
    name: `${firstName} ${lastName}`,
    userName,
    email: `${userName}@example.com`,
  }
}

const prisma = new PrismaClient()

async function main() {
  const users = await Promise.all(
    [...Array(10)].map(async () =>
      await prisma.user.create({ data: generateUserData() })
    )
  )
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })