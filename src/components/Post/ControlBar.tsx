import { HStack } from "@chakra-ui/react"
import React from "react"

type Props = {
  children: React.ReactNode
}

export function ControlBar({ children }: Props) {
  return (
    <HStack justify="space-evenly" p={1}>
      {children}
    </HStack>
  )
}