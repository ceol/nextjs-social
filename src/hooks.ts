import { useQuery, gql, useMutation, MutationHookOptions } from "@apollo/client"
import { PostData } from "./types"

type IDType = number | string | string[] | undefined

type PostsReturnData = {
  homePosts: PostData[]
}

type PostReturnData = {
  post: PostData
}

type PostMutationResponse = {
  code: string,
  success: boolean,
  message: string,
  post?: PostData,
}

export function useHomePosts() {
  return useQuery<PostsReturnData>(gql`
    query GetHomePosts {
      homePosts {
        id
        content
        datePosted

        replyCount
        repostCount
        likeCount

        isLiked
        isReposted

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
        repostCount
        likeCount

        isLiked
        isReposted

        author {
          id
          name
          userName
        }
      }
    }
  `,
  {
    variables: {
      id,
    },
    skip: !shouldFetch,
  })
}

const defaultOptions: MutationHookOptions = {
  update(cache, { data }) {
    if (data?.success && data?.post) {
      const post = data.post
      cache.modify({
        fields: {
          homePosts(existingPosts: PostData[] = []) {
            return existingPosts.map(p => (
              p.id === post.id ?
                { ...p, ...post }
                : p
            ))
          }
        }
      })
    }
  }
}

export function useRepostPost() {
  return useMutation<PostMutationResponse>(gql`
    mutation RepostPost($id: ID!) {
      repostPost(id: $id) {
        code
        success
        message
        post {
          id
          repostCount
          isReposted
        }
      }
    }
  `,
  {
    ...defaultOptions
  })
}

export function useUnrepostPost() {
  return useMutation<PostMutationResponse>(gql`
    mutation UnrepostPost($id: ID!) {
      unrepostPost(id: $id) {
        code
        success
        message
        post {
          id
          repostCount
          isReposted
        }
      }
    }
  `,
  {
    ...defaultOptions
  })
}

export function useLikePost() {
  return useMutation<PostMutationResponse>(gql`
    mutation LikePost($id: ID!) {
      likePost(id: $id) {
        code
        success
        message
        post {
          id
          likeCount
          isLiked
        }
      }
    }
  `,
  {
    ...defaultOptions
  })
}

export function useUnlikePost() {
  return useMutation<PostMutationResponse>(gql`
    mutation UnLikePost($id: ID!) {
      unlikePost(id: $id) {
        code
        success
        message
        post {
          id
          likeCount
          isLiked
        }
      }
    }
  `,
  {
    ...defaultOptions
  })
}