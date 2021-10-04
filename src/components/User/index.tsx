import * as React from "react"

type Props = {
  children: React.ReactNode,
}

export default ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}