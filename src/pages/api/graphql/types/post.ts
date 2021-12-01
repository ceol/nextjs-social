import { gql } from "apollo-server"

export const postDefs = gql`

type Post {
  id: ID
  content: String
  datePosted: Date
  replyCount: Int
  boostCount: Int
  likeCount: Int
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

type BoostPostMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  post: Post
}

type UnboostPostMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  post: Post
}

type LikePostMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  post: Post
}

type UnlikePostMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  post: Post
}

type Query {
  posts: [Post]
  post(id: ID!): Post
}

type Mutation {
  addPost(content: String!): AddPostMutationResponse
  deletePost(id: ID!): DeletePostMutationResponse

  boostPost(id: ID!): BoostPostMutationResponse
  unboostPost(id: ID!): UnboostPostMutationResponse

  likePost(id: ID!): LikePostMutationResponse
  unlikePost(id: ID!): UnlikePostMutationResponse
}
`