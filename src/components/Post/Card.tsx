import * as React from "react"
import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, RefreshIcon, ShareIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid"
import { PostData } from "../../types"
import { Control } from "./Control"
import { useLikePost, useRepostPost, useUnlikePost, useUnrepostPost } from "../../hooks"
import { ProfileImage } from "../Author/ProfileImage"
import { Box, HStack, VStack } from "@chakra-ui/react"
import { Link } from "../Link"
import { ControlBar } from "./ControlBar"

const MINUTE = 60,
      HOUR = MINUTE * 60,
      DAY = HOUR * 24

function getReadableDate(dateInSeconds: number) {
  const date = new Date(dateInSeconds),
        deltaInSeconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (deltaInSeconds < MINUTE) {
    return `${deltaInSeconds}s`
  } else if (deltaInSeconds < HOUR) {
    return `${Math.floor(deltaInSeconds / MINUTE)}m`
  } else if (deltaInSeconds < DAY) {
    return `${Math.floor(deltaInSeconds / HOUR)}h`
  } else {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
  }
}

type Props = {
  post: PostData
}

export function Card({ post }: Props) {
  const authorUrl = `/${post.author.userName}`,
        postUrl = `${authorUrl}/${post.id}`

  const [likeMutation] = useLikePost()
  const [unlikeMutation] = useUnlikePost()
  const [repostMutation] = useRepostPost()
  const [unrepostMutation] = useUnrepostPost()
  const mutationOptions = { variables: { id: post.id }}

  return (
    <VStack align="stretch">
      <HStack>
        <ProfileImage author={post.author} />
        <VStack>
          <HStack>
            <Link href={authorUrl}>
              {post.author.name}
            </Link>
            <Link href={authorUrl}>
              @{post.author.userName}
            </Link>
            <Link href={postUrl}>
              {getReadableDate(post.datePosted)}
            </Link>
            <DotsHorizontalIcon className="w-5" />
          </HStack>
          <Box whiteSpace="pre-line">
            {post.content}
          </Box>
        </VStack>
      </HStack>
      <ControlBar>
        <Control
          icon={ChatAlt2Icon}
          onClick={event => {
            event.preventDefault()
          }}
        >
          {post.replyCount > 0 ? post.replyCount : undefined}
        </Control>
        <Control
          icon={RefreshIcon}
          onClick={event => {
            event.preventDefault()
            const mutation = post.isReposted ? unrepostMutation : repostMutation
            mutation(mutationOptions)
          }}
          color={post.isReposted ? "reposted" : undefined}
        >
          {post.repostCount > 0 ? post.repostCount : undefined}
        </Control>
        <Control
          icon={post.isLiked ? HeartIconSolid : HeartIcon}
          onClick={event => {
            event.preventDefault()
            const mutation = post.isLiked ? unlikeMutation : likeMutation
            mutation(mutationOptions)
          }}
          color={post.isLiked ? "liked" : undefined}
        >
          {post.likeCount > 0 ? post.likeCount : undefined}
        </Control>
        <Control
          icon={ShareIcon}
          onClick={event => {
            event.preventDefault()
          }}
        />
      </ControlBar>
    </VStack>
  )
}