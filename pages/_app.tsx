import "../styles/globals.css"
import type { AppProps } from "next/app"
import { makeServer } from "../api/server"
import { SWRConfig } from "swr"
import Layout from "../components/Layout"
import { fetcher } from "../api/client"

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
export default MyApp
