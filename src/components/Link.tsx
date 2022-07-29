import React from "react"
import NextLink from "next/link"
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react"

export function Link({ href = "", ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}/>
    </NextLink>
  )
}