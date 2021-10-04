import Link from "next/link"
import { UserCircleIcon } from "@heroicons/react/solid"
import { usePosts } from "./hooks"
import { PostControlList } from "./PostControlList"
import { PostType, ResponsePostType } from "./types"

function PostAuthorImage() {
  return (
    <UserCircleIcon className="self-start flex-shrink-0 w-12 text-gray-400" />
  )
}

function PostListItem({ post }: { post: PostType }) {
  const url = `/${post.author.userName}/${post.id}`
  return (
    <Link href={url}>
      <div className="flex flex-col border-b hover:bg-gray-50 p-2 pb-1 text-sm cursor-pointer">
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
    </Link>
  )
}

export default function PostList() {
  const { data, isLoading, isError } = usePosts()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error! {isError}</div>
  if (! data) return <div>Something went wrong :(</div>

  return (
    <div>
      {data.posts.map((postData: ResponsePostType) => {
        const author = data.users.find((user: any) => user.id == postData.author)
        if (! author) return

        const post = {
          ...postData,
          author: author,
        }

        return (
          <PostListItem post={post} key={post.id} />
        )
      })}
    </div>
  )
}