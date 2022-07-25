import React from "react"
import { IconComponent } from "../../types"

type Props = {
  label: string
  icon: IconComponent
  onClick: (event: React.SyntheticEvent) => void
  text?: string | number
  className?: string
}

export function Control({ label, icon: Icon, onClick, text, className = "" }: Props) {
  return (
    <div className="w-1/4 flex">
      <div
        className={`flex-shrink flex gap-1.5 pr-2 items-center cursor-pointer group ${className}`}
        onClick={onClick}
        >
        <Icon className="w-8 p-1.5 rounded-full" />
        {text}
      </div>
    </div>
  )
}