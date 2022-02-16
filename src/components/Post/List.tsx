import Link from "next/link"
import React from "react"
import { PostData } from "../../types"
import { Card } from "./Card"

type ListItemProps = {
  href: string
  children: React.ReactNode
}

function ListItem({ href, children }: ListItemProps) {
  return (
    <Link href={href}>
      <div className="cursor-pointer">
        {children}
      </div>
    </Link>
  )
}

type Props = {
  posts: PostData[],
}

export function List({ posts }: Props) {
    return (
      <div>
        {posts && posts.map((post) => {
          const authorUrl = `/${post.author.userName}`,
                postUrl = `${authorUrl}/${post.id}`
          return (
            <ListItem href={postUrl} key={post.id}>
              <Card
                post={post}
              />
            </ListItem>
          )
        })}
      </div>
    )
}