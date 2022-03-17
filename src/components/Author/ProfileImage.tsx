import { UserCircleIcon } from "@heroicons/react/outline"
import React from "react"
import { UserData } from "../../types"

type Props = {
  author: UserData
  className?: string
  iconClassName?: string
}

export function ProfileImage({ author, className = "", iconClassName = "" }: Props) {
  return (
    <div className={`${className}`}>
      <UserCircleIcon className={`self-start flex-none w-12 text-gray-400 ${iconClassName}`}  />
    </div>
  )
}