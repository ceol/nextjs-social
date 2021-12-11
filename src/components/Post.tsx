import * as React from "react"
import Link from "next/link"
import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, RefreshIcon, ShareIcon, UserCircleIcon } from "@heroicons/react/outline"
import { IconComponent, PostData } from "../types"

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

type ControlProps = {
  label: string,
  icon: IconComponent,
  clickHandler: (event?: React.SyntheticEvent) => void,
  text?: string | number,
}

function Control({ label, icon: Icon, clickHandler, text }: ControlProps) {
  return (
    <div className="flex-1 flex space-x-2 items-center">
      <div className={`rounded-full cursor-pointer`} onClick={clickHandler}>
        <Icon className="w-5" />
      </div>
      <div>
        {text}
      </div>
    </div>
  )
}

type PostProps = {
  post: PostData,
  expanded?: Boolean,
}

export function Post({ post, expanded = false }: PostProps) {
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
          <Control
            label="Reply"
            icon={ChatAlt2Icon}
            clickHandler={() => {}}
            text={post.replyCount > 0 ? post.replyCount : undefined}
          />
          <Control
            label="Repost"
            icon={RefreshIcon}
            clickHandler={() => {}}
            text={post.repostCount > 0 ? post.repostCount : undefined}
          />
          <Control
            label="Like"
            icon={HeartIcon}
            clickHandler={() => {}}
            text={post.likeCount > 0 ? post.likeCount : undefined}
          />
          <Control
            label="Share"
            icon={ShareIcon}
            clickHandler={() => {}}
          />
        </div>
      </div>
    </div>
  )
}