import Head from "next/head"
import { useRouter } from "next/router"
import { PostDetail } from "../../../components/PostDetail"

export default function PostDetailPage() {
  const router = useRouter()
  const { userName, postId } = router.query

  return (
    <>
      <Head>
        <title>Post Detail | Social</title>
      </Head>
      <PostDetail postId={postId} />
    </>
  )
}

// export async function getServerSideProps({ params }: any) {
//   const { postId } = params

//   const data = await fetcher(getURL(postId))

//   return {
//     props: {
//       fallbackData: data,
//       postId: postId,
//     }
//   }
// }