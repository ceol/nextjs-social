import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout } from "../components/Layout"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache()
})

function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
export default App
