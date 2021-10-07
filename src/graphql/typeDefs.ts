import { gql } from "apollo-server-core"

const typeDefs = gql`
  type User {
    id: ID
    displayName: String
    userName: String
    posts: [Post]
  }

  type Post {
    id: ID
    content: String
    author: User
  }

  type Query {
    users: [User]
    user(id: ID!): User

    posts: [Post]
    post(id: ID!): Post
  }
`

export default typeDefs