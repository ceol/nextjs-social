import { useRouter } from "next/router"
import Head from "next/head"

export default function MessageDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Message Detail | Social</title>
      </Head>
    </>
  )
}