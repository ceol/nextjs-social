import * as React from "react"
import { Header } from "./Header"

type Props = {
  children?: React.ReactNode,
}

export function Layout({ children }: Props) {
  return (
    <div className="flex">
      <div className="flex-grow flex-shrink-0">
        <Header />
      </div>
      <main className="flex-grow flex-shrink flex border-l">
        <div className="" style={{width: "600px"}}>
          {children}
        </div>
        <div className="w-80 border-l">

        </div>
      </main>
    </div>
  )
}