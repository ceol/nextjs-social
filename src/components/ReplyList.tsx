import { PostData } from "../types"
import { PostList } from "./PostList"

type Props = {
  replies: PostData[]
}

export function ReplyList({ replies }: Props) {
  return (
    <PostList posts={replies} />
  )
}
