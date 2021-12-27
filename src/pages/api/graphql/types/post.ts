import { gql } from "apollo-server"

export const postDefs = gql`

type Post {
  id: ID
  content: String
  datePosted: Date
  replyCount: Int
  repostCount: Int
  likeCount: Int
  author: User

  isLiked: Boolean
  isReposted: Boolean
}

type PostMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  post: Post
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
  post: Post
}

type RepostPostMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  post: Post
}

type UnrepostPostMutationResponse implements MutationResponse {
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
  post(id: ID!): Post
  homePosts: [Post]
}

type Mutation {
  addPost(content: String!): PostMutationResponse
  deletePost(id: ID!): PostMutationResponse

  repostPost(id: ID!): PostMutationResponse
  unrepostPost(id: ID!): PostMutationResponse

  likePost(id: ID!): PostMutationResponse
  unlikePost(id: ID!): PostMutationResponse
}
`