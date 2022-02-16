import { useQuery, gql, useMutation } from "@apollo/client"
import { PostData } from "./types"

type IDType = number | string | string[] | undefined

type PostsReturnData = {
  homePosts: PostData[]
}

type PostReturnData = {
  post: PostData
}

type PostMutationResponse = {
  code: string
  success: boolean
  message: string
  post?: PostData
}

type AddPostMutationResponse = {
  addPost: PostMutationResponse
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

        replies {
          id
          content
          datePosted

          author {
            id
            name
            userName
          }

          replyCount

          repostCount

          likeCount

          isLiked
          isReposted
        }
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

export function useAddPost() {
  return useMutation<AddPostMutationResponse>(gql`
    mutation AddPost($content: String!, $parentId: String) {
      addPost(content: $content, parentId: $parentId) {
        code
        success
        message
        post {
          id
          content
          datePosted

          author {
            id
            name
            userName
          }

          parent {
            id
          }
        }
      }
    }
  `,
  {
    update(cache, { data }) {
      if (data?.addPost.success && data?.addPost.post) {
        const post = data?.addPost.post
        cache.modify({
          fields: {
            homePosts(existingPosts: PostData[] = []) {
              return [
                post,
                ...existingPosts,
              ]
            }
          }
        })
        if (post.parent) {
          cache.modify({
            id: cache.identify(post.parent),
            fields: {
              replies(existingReplies: PostData[] = []) {
                return [
                  post,
                  existingReplies
                ]
              },
              replyCount(existingCount: number) {
                return existingCount + 1
              }
            }
          })
        }
      }
    }
  })
}

export function useRepostPost() {
  return useMutation<{ repostPost: PostMutationResponse }>(gql`
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
  `)
}

export function useUnrepostPost() {
  return useMutation<{ unrepostPost: PostMutationResponse }>(gql`
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
  `)
}

export function useLikePost() {
  return useMutation<{ likePost: PostMutationResponse }>(gql`
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
  `)
}

export function useUnlikePost() {
  return useMutation<{ unlikePost: PostMutationResponse }>(gql`
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
  `)
}