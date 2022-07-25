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

  isFollowedBy: Boolean
  isFollowing: Boolean
}

type Query {
  users: [User]
  user(userName: String!): User
}

type UserMutationResponse implements MutationResponse {
  code: String!
  success: Boolean!
  message: String!
  user: User
}

type Mutation {
  follow(id: ID!): UserMutationResponse
  unfollow(id: ID!): UserMutationResponse
}
`