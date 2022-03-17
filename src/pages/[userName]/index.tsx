import Head from "next/head"
import { useRouter } from "next/router"
import { Card } from "../../components/Author/Card"
import { LoadingIcon } from "../../components/LoadingIcon"
import { List } from "../../components/Post/List"
import { useAuthor } from "../../hooks"

export default function AuthorPage() {
  const router = useRouter()
  const { userName } = router.query

  const { data, loading, error } = useAuthor(userName)

  let content: React.ReactNode
  if (loading) content = <LoadingIcon />
  else if (error) content = "Error!"
  else if (data) {
    content = (
      <>
        <div className="border-b">
          <Card author={data.user} />
        </div>
        <List posts={data.user.posts} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Author | Social</title>
      </Head>
      <div>
        {content}
      </div>
    </>
  )
}