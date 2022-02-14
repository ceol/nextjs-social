import { Post, PrismaClient, User } from "@prisma/client"
import * as faker from "faker"

function generateUserData() {
  const firstName = faker.name.firstName(),
        lastName = faker.name.lastName(),
        userName = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`.replace(/[^a-z\.]+/, ""),
        suffix = Math.floor(Math.random() * 20)
  return {
    name: `${firstName} ${lastName}`,
    userName,
    email: `${userName}${suffix ? suffix : ""}@example.com`,
  }
}

function generatePostData() {
  return {
    content: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
    datePosted: faker.date.recent(),
  }
}

const prisma = new PrismaClient()

async function main() {
  // Clear DB
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Create users first
  let users: User[] = []
  for (let index = 0; index < 300; index++) {
    const user = await prisma.user.create({ data: generateUserData() })
    users.push(user)
  }

  // Generate initial threads
  let threads: Post[] = []
  for (let index = 0; index < 200; index++) {
    const post = await prisma.post.create({
      data: {
        ...generatePostData(),
        authorId: users[Math.floor(Math.random()*users.length)].id,
      }
    })
    threads.push(post)
  }

  // Generate replies
  let replies: Post[] = []
  for (let index = 0; index < 400; index++) {
    const parent = threads[Math.floor(Math.random()*threads.length)]
    const post = await prisma.post.create({
      data: {
        ...generatePostData(),
        authorId: users[Math.floor(Math.random()*users.length)].id,
        parentId: parent.id,
      }
    })
    await prisma.post.update({
      data: {
        replyCount: {
          increment: 1
        }
      },
      where: {
        id: parent.id,
      }
    })
    replies.push(post)
  }

  const allPosts = threads.concat(replies)

  // Generate reposts
  for (let index = 0; index < allPosts.length; index++) {
    const post = allPosts[index]
    for (let count = 0; count < Math.floor(Math.random()*100); count++) {
      const randomUser = users[Math.floor(Math.random()*users.length)]
      await prisma.post.update({
        where: {
          id: post.id
        },
        data: {
          repostedBy: {
            connect: {
              id: randomUser.id
            }
          },
          repostCount: {
            increment: 1
          }
        }
      })
    }
  }

  // Generate likes
  for (let index = 0; index < allPosts.length; index++) {
    const post = allPosts[index]
    for (let count = 0; count < Math.floor(Math.random()*100); count++) {
      const randomUser = users[Math.floor(Math.random()*users.length)]
      await prisma.post.update({
        where: {
          id: post.id
        },
        data: {
          likedBy: {
            connect: {
              id: randomUser.id
            }
          },
          likeCount: {
            increment: 1
          }
        }
      })
    }
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })