import Head from "next/head"
import { PostList } from "../components/Post"

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Social</title>
      </Head>
      <PostList />
    </>
  )
}
