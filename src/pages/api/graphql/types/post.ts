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
  posts: [Post]
  post(id: ID!): Post
  homePosts: [Post]
}

type Mutation {
  addPost(content: String!): AddPostMutationResponse
  deletePost(id: ID!): DeletePostMutationResponse

  repostPost(id: ID!): RepostPostMutationResponse
  unrepostPost(id: ID!): UnrepostPostMutationResponse

  likePost(id: ID!): LikePostMutationResponse
  unlikePost(id: ID!): UnlikePostMutationResponse
}
`