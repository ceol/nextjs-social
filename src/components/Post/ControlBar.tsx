import { HStack } from "@chakra-ui/react"
import React from "react"

type Props = {
  children: React.ReactNode
}

export function ControlBar({ children }: Props) {
  return (
    <HStack justify="space-evenly">
      {children}
    </HStack>
  )
}