import Link from "next/link"
import React from "react"
import { useLikePost, useRepostPost, useUnlikePost, useUnrepostPost } from "../hooks"
import { PostData } from "../types"
import { PostCard } from "./PostCard"

type PostListItemProps = {
  href: string
  children: React.ReactNode
}

function PostListItem({ href, children }: PostListItemProps) {
  return (
    <Link href={href}>
      <div className="cursor-pointer">
        {children}
      </div>
    </Link>
  )
}

type PostListProps = {
  posts: PostData[],
}

export function PostList({ posts }: PostListProps) {
    const [likeMutation] = useLikePost()
    const [unlikeMutation] = useUnlikePost()
    const [repostMutation] = useRepostPost()
    const [unrepostMutation] = useUnrepostPost()

    return (
      <div>
        {posts && posts.map((post) => {
          const authorUrl = `/${post.author.userName}`,
                postUrl = `${authorUrl}/${post.id}`
          return (
            <PostListItem href={postUrl} key={post.id}>
              <PostCard
                post={post}
                handleReplyClick={() => {}}
                handleRepostClick={(event, post) => {
                  event.preventDefault()
                  const options = { variables: { id: post.id }}
                  if (post.isReposted) {
                    unrepostMutation(options)
                  } else {
                    repostMutation(options)
                  }
                }}
                handleLikeClick={(event, post) => {
                  event.preventDefault()
                  const options = { variables: { id: post.id }}
                  if (post.isLiked) {
                    unlikeMutation(options)
                  } else {
                    likeMutation(options)
                  }
                }}
              />
            </PostListItem>
          )
        })}
      </div>
    )
}