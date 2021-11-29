import { gql } from "apollo-server"

export const postDefs = gql`

type Post {
  id: ID
  content: String
  datePosted: Date
  author: User
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

type Query {
  posts: [Post]
  post(id: ID!): Post
}

type Mutation {
  addPost(content: String!): AddPostMutationResponse
  deletePost(id: ID!): DeletePostMutationResponse
}
`