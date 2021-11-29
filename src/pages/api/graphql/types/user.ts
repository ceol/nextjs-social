import { gql } from "apollo-server"

export const userDefs = gql`

type User {
  id: ID
  name: String
  userName: String
  posts: [Post]
}

type Query {
  users: [User]
  user(id: ID!): User
}
`