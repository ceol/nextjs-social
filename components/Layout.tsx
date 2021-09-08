import * as React from "react"
import Header from "./Header"

type Props = {
  children?: React.ReactNode,
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <Header />
      <main className="flex-grow flex-shrink flex">
        <div className="" style={{width: "600px"}}>
          {children}
        </div>
        <div className="w-80 border-l">
          Sidebar
        </div>
      </main>
    </div>
  )
}