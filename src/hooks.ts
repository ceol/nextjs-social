import { useQuery, gql } from "@apollo/client"
import { PostData } from "./types"

type IDType = number | string | string[] | undefined

type PostsReturnData = {
  posts: PostData[]
}

type PostReturnData = {
  post: PostData
}

export function useHomePosts() {
  return useQuery<PostsReturnData>(gql`
query GetHomePosts {
  posts {
    id
    content
    datePosted
    replyCount
    boostCount
    likeCount
    author {
      id
      name
      userName
    }
  }
}
  `)
}

export function usePost(id: IDType) {
  const shouldFetch = Boolean(id)

  return useQuery<PostReturnData>(gql`
query GetPost($id: ID!) {
  post(id: $id) {
    id
    content
    datePosted
    replyCount
    boostCount
    likeCount
    author {
      id
      name
      userName
    }
  }
}
  `,
  { variables: { id }, skip: !shouldFetch })
}