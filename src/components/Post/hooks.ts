import { useQuery, gql } from "@apollo/client"
import { UserType } from "../User/types"
import { PostType } from "./types"

type IDType = number | string | string[] | undefined

type PostsData = {
  posts: PostType[]
}

type PostData = {
  post: PostType
}

export function usePosts() {
  return useQuery<PostsData>(gql`
    query GetPosts {
      posts {
        id
        content
        author {
          id
          displayName
          userName
        }
      }
    }
  `)
}

export function usePost(id: IDType) {
  const shouldFetch = Boolean(id)

  return useQuery<PostData>(gql`
    query GetPost($id: ID!) {
      post(id: $id) {
        id
        content
        author {
          id
          displayName
          userName
        }
      }
    }
  `,
  { variables: { id }, skip: !shouldFetch })
}