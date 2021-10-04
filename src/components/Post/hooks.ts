import { useQuery } from "react-query"
import { UserType } from "../User/types"
import { ResponsePostType } from "./types"

type IDType = number | string | string[] | undefined

type ResponseType = {
  posts: ResponsePostType[],
  users: UserType[]
}

export function getURL(id: IDType) {
  let url = "http://localhost:3000/api/posts"
  if (id) url += `/${id}`
  return url
}

export function usePosts() {
  return useQuery<ResponseType>("/api/posts")
}

export function usePost(id: IDType) {
  const shouldFetch = Boolean(id)

  return useQuery(`/api/posts/${id}`, {
    enabled: shouldFetch,
  })
}