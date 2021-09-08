import useSWR from "swr"

type IDType = number | string | string[] | undefined

export function getURL(id: IDType) {
  let url = "http://localhost:3000/api/posts"
  if (id) url += `/${id}`
  return url
}

export function usePosts() {
  const { data, error, mutate } = useSWR("/api/posts")

  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
    mutate: mutate,
  }
}

export function usePost(id: IDType) {
  const shouldFetch = Boolean(id)

  const { data, error, mutate } = useSWR(shouldFetch ? `/api/posts/${id}` : null)

  return {
    data: data,
    isLoading: shouldFetch && !data && !error,
    isError: error,
    mutate: mutate,
  }
}