import React from "react"
import { PostData } from "../../types"
import { Card } from "./Card"
import { Link } from "./Link"

type Props = {
  posts: PostData[]
  className?: String
  children?: (post: PostData) => React.ReactNode
}

const defaultItemFn = (post: PostData) => <Card post={post} />

export function List({ posts, className, children = defaultItemFn }: Props) {
  return (
    <div className={`divide-y border-b ${className}`}>
      {posts.map(post => (
        <Link post={post}>
          {children(post)}
        </Link>
      ))}
    </div>
  )
}