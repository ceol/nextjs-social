import { useHomePosts } from "../hooks"
import { List } from "./Post/List"

export function HomeList() {
  const { data, loading, error } = useHomePosts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>
  if (! data) return <div>Something went wrong :(</div>

    return (
      <div className="border-t">
        <List posts={data.homePosts} />
      </div>
    )
}
