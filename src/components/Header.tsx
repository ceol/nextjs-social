import { AtSymbolIcon, BellIcon, DotsCircleHorizontalIcon, HomeIcon, MailIcon, UserIcon } from "@heroicons/react/outline"
import Link from "next/link"
import React, { ReactNode } from "react"

type HeaderControl = {
  label: string,
  href: string,
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element,
}

const controls: HeaderControl[] = [
  {label: "Home", href: "/home", icon: HomeIcon},
  {label: "Notifications", href: "/notifications", icon: BellIcon},
  {label: "Messages", href: "/messages", icon: MailIcon},
  {label: "Profile", href: "/profile", icon: UserIcon},
  {label: "More", href: "#", icon: DotsCircleHorizontalIcon},
]

function HeaderLink({ href, children }: { href: string, children: ReactNode}) {
  return (
    <Link href={href}>
      <a className="flex items-center gap-4 max-w-max px-4 pr-6 py-3 rounded-full text-xl text-gray-700 cursor-pointer hover:bg-gray-100">
        {children}
      </a>
    </Link>
  )
}

export function Header() {
  return (
    <header className="flex flex-col items-end">
      <div className="flex flex-col w-60 my-1">
        <HeaderLink href="/">
          <AtSymbolIcon className="w-8" />
        </HeaderLink>
      </div>
      <div className="flex flex-col w-60">
        {controls.map(({ label, href, icon: Icon }, index) => (
          <HeaderLink href={href} key={index}>
            <Icon className="w-8" />
            {label}
          </HeaderLink>
        ))}
      </div>
    </header>
  )
}