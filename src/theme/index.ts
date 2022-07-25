import { extendTheme } from "@chakra-ui/react"
import styles from "./styles"
import borders from "./foundations/borders"
import colors from "./foundations/colors"
import semanticTokens from "./semanticTokens"

const overrides = {
  styles,
  borders,
  colors,
  semanticTokens,
}

export default extendTheme(overrides)