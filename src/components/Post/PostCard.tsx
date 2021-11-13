import Link from "next/link"
import { UserCircleIcon } from "@heroicons/react/outline"
import { PostType } from "./types"
import { PostControlList } from "./PostControlList"

function PostAuthorImage() {
  return (
    <UserCircleIcon className="self-start flex-shrink-0 w-12 text-gray-400" />
  )
}

type PostCardProps = {
  post: PostType,
}

export function PostCard({ post }: PostCardProps) {
  const url = `/${post.author.userName}/${post.id}`
  return (
    <div>
      {post &&
        <div className="flex flex-col border-b hover:bg-gray-50 p-2 pb-1 text-sm">
          <div className="flex gap-2">
            <PostAuthorImage />
            <div className="flex flex-col gap-0.5 pb-0.5">
              <div className="flex gap-1">
                {post.author.displayName}
                <span className="text-gray-500 hover:underline">
                  @{post.author.userName}
                </span>
                <span className="text-gray-500">
                ·
                </span>
                <Link href={url}>
                  <a className="text-gray-500 hover:underline">
                    1m
                  </a>
                </Link>
              </div>
              <div>
                {post.content}
              </div>
            </div>
          </div>
          <PostControlList post={post} />
        </div>
      }
    </div>
  )
}