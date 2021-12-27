import Link from "next/link"
import { useHomePosts } from "../hooks"
import { PostData } from "../types"
import { PostCard } from "./PostCard"

type PostListItemProps = {
  post: PostData,
}

function PostListItem({ post }: PostListItemProps) {
  const authorUrl = `/${post.author.userName}`,
        postUrl = `${authorUrl}/${post.id}`
  return (
    <Link href={postUrl}>
      <div className="cursor-pointer">
        <PostCard post={post} />
      </div>
    </Link>
  )
}

type PostListProps = {
  posts: PostData[],
}

export function PostList({ posts }: PostListProps) {
    return (
      <div>
        {posts && posts.map((post, index) =>
          <PostListItem post={post} />
        )}
      </div>
    )
}

export function HomePostList() {
  const { data, loading, error } = useHomePosts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>
  if (! data) return <div>Something went wrong :(</div>

    return <PostList posts={data.homePosts} />
}