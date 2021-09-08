import { AtSymbolIcon, BellIcon, DotsCircleHorizontalIcon, HomeIcon, MailIcon, UserIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { ComponentType, ReactNode } from "react"

type HeaderControlType = {
  label: string,
  href: string,
  icon: ComponentType,
}

const headerControls: HeaderControlType[] = [
  {label: "Home", href: "/", icon: HomeIcon},
  {label: "Notifications", href: "/notifications", icon: BellIcon},
  {label: "Messages", href: "/", icon: MailIcon},
  {label: "Profile", href: "/", icon: UserIcon},
  {label: "More", href: "/", icon: DotsCircleHorizontalIcon},
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

export default function Header() {
  return (
    <header className="flex-grow flex-shrink-0 flex flex-col items-end border-r">
      <div className="flex flex-col w-60 mt-2 mb-5">
        <HeaderLink href="/">
          <AtSymbolIcon className="w-8" />
          Social
        </HeaderLink>
      </div>
      <div className="flex flex-col w-60">
        {headerControls && headerControls.map((control: HeaderControlType, index) => (
          <HeaderLink href={control.href} key={index}>
            <control.icon
              // @ts-ignore
              className="w-8"
            />
            {control.label}
          </HeaderLink>
        ))}
      </div>
    </header>
  )
}