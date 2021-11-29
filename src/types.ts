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
}

export type IconComponent = (props: React.ComponentProps<"svg">) => JSX.Element