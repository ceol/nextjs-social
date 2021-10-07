import Head from "next/head"
import PostCard from "../../../components/Post/PostCard"
import { PostType, usePost } from "../../../components/Post"
import { useRouter } from "next/router"

export default function PostDetail() {
  const router = useRouter()
  const { userName, postId } = router.query

  const { data, loading, error } = usePost(postId)
  return (
    <>
      <Head>
        <title>Post Detail | Social</title>
      </Head>
      {loading &&
        <div>Loading...</div>
      }
      {error &&
        <div>Error! {error}</div>
      }
      {data &&
        <PostCard post={data.post} />
      }
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