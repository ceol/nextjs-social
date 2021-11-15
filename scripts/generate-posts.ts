import { PrismaClient } from "@prisma/client"
import * as faker from "faker"

function generatePostData() {
  return {
    content: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
  }
}

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  if (! users) return

  const posts = await Promise.all(
    [...Array(100)].map(async () =>
      await prisma.post.create({
        data: {
          ...generatePostData(),
          authorId: users[Math.floor(Math.random()*users.length)].id,
        }
      })
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