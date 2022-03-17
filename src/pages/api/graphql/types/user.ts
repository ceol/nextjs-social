import { gql } from "apollo-server"

export const userDefs = gql`

type User {
  id: ID
  name: String
  userName: String

  posts: [Post]

  reposts: [Post]
  likes: [Post]

  following: [User]
  followingCount: Int

  followedBy: [User]
  followedByCount: Int
}

type Query {
  users: [User]
  user(userName: String!): User
}
`