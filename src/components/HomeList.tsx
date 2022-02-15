import { useHomePosts } from "../hooks"
import { PostForm } from "./PostForm"
import { PostList } from "./PostList"

export function HomeList() {
  const { data, loading, error } = useHomePosts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>
  if (! data) return <div>Something went wrong :(</div>

    return (
      <div>
        <PostForm />
        <PostList posts={data.homePosts} />
      </div>
    )
}
