import Head from "next/head"
import { HomeList } from "../components/HomeList"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Social</title>
      </Head>
      <div>
        <HomeList />
      </div>
    </>
  )
}
