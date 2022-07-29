import { Icon, IconProps } from "@chakra-ui/react"
import { UserCircleIcon } from "@heroicons/react/outline"
import React from "react"
import { UserData } from "../../types"

type Props = {
  author: UserData
} & IconProps

export function ProfileImage({ author, ...props }: Props) {
  return (
    <Icon as={UserCircleIcon} {...props} />
  )
}