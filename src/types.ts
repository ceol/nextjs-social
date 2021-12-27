export type UserData = {
  id: string,
  name: string,
  userName: string,
}

export type PostData = {
  id: string,
  content: string,
  datePosted: number,
  author: UserData,
  replyCount: number,
  repostCount: number,
  likeCount: number,
  isLiked: boolean,
  isReposted: boolean,
}

export type IconComponent = (props: React.ComponentProps<"svg">) => JSX.Element