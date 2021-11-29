import Head from "next/head"
import { HomePostList } from "../components/PostList"

export default function Home() {
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
