export type UserData = {
  id: string
  name: string
  userName: string
}

export type PostData = {
  id: string
  content: string
  datePosted: number
  author: UserData

  replies: PostData[]
  replyCount: number

  repostedBy: UserData[]
  repostCount: number

  likedBy: UserData[]
  likeCount: number

  parentId: string
  parent?: PostData

  isLiked: boolean
  isReposted: boolean
}

export type IconComponent = (props: React.ComponentProps<"svg">) => JSX.Element