import Head from "next/head"
import PostCard from "../../../components/Post/PostCard"
import { PostType, usePost } from "../../../components/Post"
import { fetcher } from "../../../api/client"
import { getURL } from "../../../components/Post/hooks"
import { useRouter } from "next/router"

type PostDetailProps = {
  postId: string,
  fallbackData: PostType,
}

export default function PostDetail() {
  const router = useRouter()
  const { user, postId } = router.query

  const { data, isLoading, isError, mutate } = usePost(postId)
  const postData: PostType = {
    ...data?.post,
    author: data?.users[0],
  }
  return (
    <>
      <Head>
        <title>Post Detail | Social</title>
      </Head>
      {isLoading &&
        <div>Loading...</div>
      }
      {isError &&
        <div>Something went wrong! {isError}</div>
      }
      {data &&
        <PostCard data={postData} />
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