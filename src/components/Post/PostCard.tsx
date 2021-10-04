import { PostType } from "./types"

type PostCardProps = {
  data: PostType
}

export default function PostCard({ data }: PostCardProps) {
  return (
    <div>
      {data &&
        <div>
          {data.content}
        </div>
      }
    </div>
  )
}