import { ComponentType } from "react"
import { UserType } from "../User/types"

export type ResponsePostType = {
  id: string,
  content: string,
  author: string,
}

export type PostType = {
  id: string,
  content: string,
  author: UserType,
}

export type PostControlType = {
  label: string,
  href: string,
  icon: ComponentType,
  className?: string,
}