import { usePost } from "../hooks"
import { Post } from "./Post"

type PostDetailProps = {
  postId: string | string[] | undefined,
}

export function PostDetail({ postId }: PostDetailProps) {
  const { data, loading, error } = usePost(postId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>
  if (! data) return <div>Something went wrong :(</div>

  return (
    <Post post={data.post} />
  )
}