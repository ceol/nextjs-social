import { gql } from "apollo-server"

export const postDefs = gql`

type Post {
  id: ID
  content: String
  datePosted: Date
  author: User

  replies: [Post]
  replyCount: Int

  repostedBy: [User]
  repostCount: Int

  likedBy: [User]
  likeCount: Int

  isLiked: Boolean
  isReposted: Boolean

  parentId: ID
  parent: Post
}

type PostMutationResponse implements MutationResponse {
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
  addPost(content: String!, parentId: String): PostMutationResponse
  deletePost(id: ID!): PostMutationResponse

  repostPost(id: ID!): PostMutationResponse
  unrepostPost(id: ID!): PostMutationResponse

  likePost(id: ID!): PostMutationResponse
  unlikePost(id: ID!): PostMutationResponse
}
`