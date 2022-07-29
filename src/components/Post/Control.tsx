import { Button, ButtonProps, Icon } from "@chakra-ui/react"
import React from "react"
import { IconComponent } from "../../types"

type Props = {
  icon: IconComponent
} & ButtonProps

export function Control({ icon, children, ...props }: Props) {
  return (
    <Button variant="ghost" rounded="full" p={3} {...props}>
      <Icon as={icon} />
      {children}
    </Button>
  )
}