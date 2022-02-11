import { useHomePosts } from "../hooks"
import { PostList } from "./PostList"

export function HomePostList() {
  const { data, loading, error } = useHomePosts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>
  if (! data) return <div>Something went wrong :(</div>

    return <PostList posts={data.homePosts} />
}
