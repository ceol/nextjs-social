import React from "react"
import { IconComponent } from "../types"

type Props = {
  label: string
  icon: IconComponent
  handleClick: (event: React.SyntheticEvent) => void
  text?: string | number
  className?: string
}

export function PostControl({ label, icon: Icon, handleClick, text, className = "" }: Props) {
  return (
    <div className={`flex-1 flex space-x-2 items-center ${className}`}>
      <div className={`rounded-full cursor-pointer`} onClick={handleClick}>
        <Icon className="w-5" />
      </div>
      <div>
        {text}
      </div>
    </div>
  )
}