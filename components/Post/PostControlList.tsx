import * as React from "react"
import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, ShareIcon } from "@heroicons/react/outline"
import { PostControlType, PostType } from "./types"
import Link from "next/link"

const postControls: PostControlType[] = [
  {label: "Reply", href: "/reply", icon: ChatAlt2Icon},
  {label: "Like", href: "/like", icon: HeartIcon, className: "hover:text-red-600 hover:bg-red-50"},
  {label: "Share", href: "/share", icon: ShareIcon},
  {label: "More", href: "/more", icon: DotsHorizontalIcon},
]

function PostControlItem({ post, control }: { post: PostType, control: PostControlType }) {
  return (
    <div className="flex-1 flex justify-center">
      <Link href={`/${post.author.userName}/${post.id}${control.href}`}>
        <a className={"rounded-full p-2 " + (control.className || "hover:text-blue-600 hover:bg-blue-50")}>
          <control.icon
            // @ts-ignore
            className="w-5"
          />
        </a>
      </Link>
    </div>
  )
}

export function PostControlList({ post }: { post: PostType }) {
  return (
    <div className="flex select-none text-xs text-gray-600">
      {postControls && postControls.map((control: PostControlType, index) => (
        <PostControlItem post={post} control={control} key={index} />
      ))}
    </div>
  )
}