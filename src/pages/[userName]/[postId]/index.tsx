import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { LoadingIcon } from "../../../components/LoadingIcon"
import { Card } from "../../../components/Post/Card"
import { Form } from "../../../components/Post/Form"
import { List } from "../../../components/Post/List"
import { usePost } from "../../../hooks"

export default function PostDetailPage() {
  const router = useRouter()
  const { userName, postId } = router.query

  const { data, loading, error } = usePost(postId)

  let content: React.ReactNode
  if (loading) content = <LoadingIcon />
  else if (error) content = "Error!"
  else if (data) {
    content = (
      <>
        <div className="border-b">
          <Card
            post={data.post}
          />
        </div>
        <Form
          parentId={data.post.id}
          placeholder={`Reply to ${data.post.author.userName}`}
        />
        {data.post.replies.length > 0 &&
          <List posts={data.post.replies} />
        }
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Post Detail | Social</title>
      </Head>
      <div className="flex flex-col">
        {content}
      </div>
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