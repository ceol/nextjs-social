import { Button, ButtonProps, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { IconComponent } from "../../types"

type Props = {
  icon: IconComponent
  hoverColor?: string
} & ButtonProps

export function Control({ icon, hoverColor, children, ...props }: Props) {
  return (
    <Button
      role="group"
      bgColor="transparent"
      _hover={{
        bgColor: "transparent",
      }}
      {...props}
    >
      <Icon
        as={icon}
        _groupHover={{
          textColor: hoverColor,
        }}
      />
      {children &&
        <Text
          pl={1}
          fontSize={13}
          _groupHover={{
            textColor: hoverColor,
          }}
        >
          {children}
        </Text>
      }
    </Button>
  )
}