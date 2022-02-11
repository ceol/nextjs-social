import Head from "next/head"
import { HomePostList } from "../components/HomePostList"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Social</title>
      </Head>
      <div>
        <HomePostList />
      </div>
    </>
  )
}
