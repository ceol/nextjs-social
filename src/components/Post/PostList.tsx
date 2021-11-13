import Link from "next/link"
import { usePosts } from "./hooks"
import PostCard from "./PostCard"
import { PostType } from "./types"

function PostListItem({ post }: { post: PostType }) {
  const url = `/${post.author.userName}/${post.id}`
  return (
    <Link href={url}>
      <div className="cursor-pointer">
        <PostCard post={post} />
      </div>
    </Link>
  )
}

export function PostList() {
  const { data, loading, error } = usePosts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>
  if (! data) return <div>Something went wrong :(</div>

  return (
    <div>
      {data.posts.map((post: PostType) => {
        return (
          <PostListItem post={post} key={post.id} />
        )
      })}
    </div>
  )
}