import { Box, BoxProps, Button, HStack } from "@chakra-ui/react"
import React from "react"
import { UserData } from "../../types"
import { ProfileImage } from "./ProfileImage"

type Props = {
  author: UserData
} & BoxProps

export function Card({ author, ...props }: Props) {
  return (
    <Box {...props}>
      <HStack w="full" justifyContent="space-between">
        <ProfileImage author={author} w={24} h={24} />
        <Button>Follow</Button>
      </HStack>
      <HStack>
        <Box>
          {author.name}
        </Box>
        <Box>
          @{author.userName}
        </Box>
      </HStack>
    </Box>
  )
}