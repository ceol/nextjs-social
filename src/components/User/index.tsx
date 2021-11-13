import * as React from "react"
import { UserType } from "./types"

type Props = {
  children: React.ReactNode,
}

export function User({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}

export type { UserType }