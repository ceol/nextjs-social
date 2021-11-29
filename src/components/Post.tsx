import * as React from "react"
import Link from "next/link"
import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, ShareIcon, UserCircleIcon } from "@heroicons/react/outline"
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
}

function Control({ icon: Icon, clickHandler }: ControlProps) {
  return (
    <div className="flex-1 flex justify-center">
      <div className={`rounded-full p-2 cursor-pointer`} onClick={clickHandler}>
        <Icon className="w-5" />
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
    <div className="flex flex-col border-b hover:bg-gray-50 p-2.5 pb-1.5 text-sm">
      <div className="flex gap-2">
        <UserCircleIcon className="self-start flex-shrink-0 w-12 text-gray-400" />
        <div className="flex flex-col gap-0.5 pb-0.5">
          <div className="flex gap-1">
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
          <div>
            {post.content}
          </div>
        </div>
      </div>
      <div className="flex select-none text-xs text-gray-600">
        <Control
          label="Reply"
          icon={ChatAlt2Icon}
          clickHandler={() => {}}
        />
        <Control
          label="Like"
          icon={HeartIcon}
          clickHandler={() => {}}
        />
        <Control
          label="Share"
          icon={ShareIcon}
          clickHandler={() => {}}
        />
        <Control
          label="More"
          icon={DotsHorizontalIcon}
          clickHandler={() => {}}
        />
      </div>
    </div>
  )
}