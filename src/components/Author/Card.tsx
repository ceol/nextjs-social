import React from "react"
import { UserData } from "../../types"
import { ProfileImage } from "./ProfileImage"

type Props = {
  author: UserData
  className?: string
}

export function Card({ author, className = "" }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex w-full">
        <ProfileImage author={author} className="flex-none" iconClassName="w-36" />
        <div className="flex-grow flex justify-end">
          <button>Follow</button>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          {author.name}
        </div>
        <div>
          @{author.userName}
        </div>
      </div>
    </div>
  )
}