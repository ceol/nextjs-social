import React from "react"
import NextLink from "next/link"
import { PostData } from "../../types"

type Props = {
  post: PostData
  children: React.ReactNode
}

export function Link({ post, children }: Props) {
  const href = `/${post.author.userName}/${post.id}`
  return (
    <NextLink href={href}>
      <div className="cursor-pointer">
        {children}
      </div>
    </NextLink>
  )
}