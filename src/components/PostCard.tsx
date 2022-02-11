import * as React from "react"
import Link from "next/link"
import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, RefreshIcon, ShareIcon, UserCircleIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid"
import { PostData } from "../types"
import { PostControl } from "./PostControl"

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

type ControlHandler = (event: React.SyntheticEvent, post: PostData) => void

type Props = {
  post: PostData
  handleReplyClick: ControlHandler
  handleRepostClick: ControlHandler
  handleLikeClick: ControlHandler
}

export function PostCard({ post, handleReplyClick, handleRepostClick, handleLikeClick }: Props) {
  const authorUrl = `/${post.author.userName}`,
        postUrl = `${authorUrl}/${post.id}`

  return (
    <div className="flex gap-2 border-b hover:bg-gray-50 p-2.5 text-sm">
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
          <div className="flex-none text-gray-600">
            <DotsHorizontalIcon className="w-5" />
          </div>
        </div>
        <div>
          {post.content}
        </div>
        <div className="flex-none flex space-x-4 pt-2 pb-1 select-none text-xs text-gray-500">
          <PostControl
            label="Reply"
            icon={ChatAlt2Icon}
            handleClick={(e) => handleReplyClick(e, post)}
            text={post.replyCount > 0 ? post.replyCount : undefined}
          />
          <PostControl
            label="Repost"
            icon={RefreshIcon}
            handleClick={(e) => handleRepostClick(e, post)}
            text={post.repostCount > 0 ? post.repostCount : undefined}
            className={post.isReposted ? "text-green-600" : undefined}
          />
          <PostControl
            label="Like"
            icon={post.isLiked ? HeartIconSolid : HeartIcon}
            handleClick={(e) => handleLikeClick(e, post)}
            text={post.likeCount > 0 ? post.likeCount : undefined}
            className={post.isLiked ? "text-pink-600" : undefined}
          />
          <PostControl
            label="Share"
            icon={ShareIcon}
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}