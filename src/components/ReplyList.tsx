import { PostData } from "../types"
import { List } from "./Post/List"

type Props = {
  replies: PostData[]
}

export function ReplyList({ replies }: Props) {
  return (
    <div className="border-t">
      <List posts={replies} />
    </div>
  )
}
