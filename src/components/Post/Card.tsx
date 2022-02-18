import * as React from "react"
import Link from "next/link"
import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, RefreshIcon, ShareIcon, UserCircleIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid"
import { PostData } from "../../types"
import { Control } from "./Control"
import { useLikePost, useRepostPost, useUnlikePost, useUnrepostPost } from "../../hooks"

const MINUTE = 60,
      HOUR = MINUTE * 60,
      DAY = HOUR * 24

function getReadableDate(dateInSeconds: number) {
  const date = new Date(dateInSeconds),
        deltaInSeconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (deltaInSeconds < MINUTE) {
    return `${deltaInSeconds}s`
  } else if (deltaInSeconds < HOUR) {
    return `${Math.floor(deltaInSeconds / MINUTE)}m`
  } else if (deltaInSeconds < DAY) {
    return `${Math.floor(deltaInSeconds / HOUR)}h`
  } else {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
  }
}

type Props = {
  post: PostData
}

export function Card({ post }: Props) {
  const authorUrl = `/${post.author.userName}`,
        postUrl = `${authorUrl}/${post.id}`

  const [likeMutation] = useLikePost()
  const [unlikeMutation] = useUnlikePost()
  const [repostMutation] = useRepostPost()
  const [unrepostMutation] = useUnrepostPost()
  const mutationOptions = { variables: { id: post.id }}

  return (
    <div className="flex gap-2 hover:bg-gray-50 p-2.5 pb-1 text-sm">
      <UserCircleIcon className="self-start flex-none w-12 text-gray-400" />
      <div className="flex-grow flex flex-col gap-1">
        <div className="flex">
          <div className="flex-grow flex gap-1">
            <Link href={authorUrl}>
              <a className="flex gap-1">
                <span className="hover:underline">
                  {post.author.name}
                </span>
                <span className="text-gray-500 hover:underline">
                  @{post.author.userName}
                </span>
              </a>
            </Link>
            <span className="text-gray-500">
            ·
            </span>
            <Link href={postUrl}>
              <a className="text-gray-500 hover:underline">
                {getReadableDate(post.datePosted)}
              </a>
            </Link>
          </div>
          <div
            className="flex-none text-gray-600 cursor-pointer"
            onClick={event => {
              event.preventDefault()
            }}
          >
            <DotsHorizontalIcon className="w-5" />
          </div>
        </div>
        <div className="whitespace-pre-line">
          {post.content}
        </div>
        <div className="flex-none flex pb-1 select-none text-xs text-gray-500">
          <Control
            label="Reply"
            icon={ChatAlt2Icon}
            onClick={event => {
              event.preventDefault()
            }}
            text={post.replyCount > 0 ? post.replyCount : undefined}
          />
          <Control
            label="Repost"
            icon={RefreshIcon}
            onClick={event => {
              event.preventDefault()
              const mutation = post.isReposted ? unrepostMutation : repostMutation
              mutation(mutationOptions)
            }}
            text={post.repostCount > 0 ? post.repostCount : undefined}
            className={post.isReposted ? "text-green-600" : undefined}
          />
          <Control
            label="Like"
            icon={post.isLiked ? HeartIconSolid : HeartIcon}
            onClick={event => {
              event.preventDefault()
              const mutation = post.isLiked ? unlikeMutation : likeMutation
              mutation(mutationOptions)
            }}
            text={post.likeCount > 0 ? post.likeCount : undefined}
            className={post.isLiked ? "text-pink-600" : undefined}
          />
          <Control
            label="Share"
            icon={ShareIcon}
            onClick={event => {
              event.preventDefault()
            }}
          />
        </div>
      </div>
    </div>
  )
}