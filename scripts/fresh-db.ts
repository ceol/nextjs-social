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

function generatePostData() {
  return {
    content: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
    datePosted: faker.date.recent(),
    replyCount: Math.floor(Math.random() * 120),
    boostCount: Math.floor(Math.random() * 120),
    likeCount: Math.floor(Math.random() * 400),
  }
}

const prisma = new PrismaClient()

async function main() {
  // Clear DB
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Create users first
  const users = await Promise.all(
    [...Array(10)].map(async () =>
      await prisma.user.create({ data: generateUserData() })
    )
  )

  // Generate posts
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