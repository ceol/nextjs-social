import { extendTheme, ThemeOverride } from "@chakra-ui/react"
import styles from "./styles"
import Button from "./components/Button"
import borders from "./foundations/borders"
import colors from "./foundations/colors"
import semanticTokens from "./semanticTokens"

const overrides: ThemeOverride = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles,
  borders,
  colors,
  semanticTokens,
  components: {
    Button,
  }
}

export default extendTheme(overrides)