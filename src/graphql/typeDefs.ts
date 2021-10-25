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

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type AddPostMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    post: Post
  }

  type DeletePostMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    addPost(content: String!): AddPostMutationResponse
    deletePost(id: ID!): DeletePostMutationResponse
  }
`

export default typeDefs