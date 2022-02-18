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
      <main className="flex-grow flex-shrink flex">
        <div className="border-l border-r min-h-screen" style={{width: "600px"}}>
          {children}
        </div>
        <div className="w-80">

        </div>
      </main>
    </div>
  )
}