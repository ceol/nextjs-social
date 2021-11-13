import * as faker from "faker"

const users = [...Array(5)].map((v, i) => {
  const id = i + 1,
        lastName = faker.name.lastName()
  return {
    id: `${id}`,
    displayName: `${faker.name.firstName()} ${lastName}`,
    userName: `${lastName.toLocaleLowerCase()}`,
  }
})

const posts = [...Array(20)].map((v, i) => {
  const id = i + 1
  return {
    id: `${id}`,
    content: faker.lorem.sentences(Math.floor(Math.random() * 4) + 1),
    author: users[Math.floor(Math.random()*users.length)],
  }
})

export { users, posts }