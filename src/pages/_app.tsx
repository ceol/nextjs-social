import "../styles/globals.css"
import type { AppProps } from "next/app"
import { makeServer } from "../api/server"
import Layout from "../components/Layout"
import { QueryClient, QueryClientProvider } from "react-query"
import { defaultQueryFn } from "../api/client"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
export default MyApp
