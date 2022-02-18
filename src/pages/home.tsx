import { StarIcon } from "@heroicons/react/outline"
import Head from "next/head"
import React from "react"
import { LoadingIcon } from "../components/LoadingIcon"
import { Form } from "../components/Post/Form"
import { List } from "../components/Post/List"
import { useHomePosts } from "../hooks"

export default function HomePage() {
  const { data, loading, error } = useHomePosts()

  let content: React.ReactNode
  if (loading) content = <LoadingIcon />
  else if (error) content = "Error!"
  else if (data) {
    content = <List posts={data.homePosts} />
  }

  return (
    <>
      <Head>
        <title>Home | Social</title>
      </Head>
      <div className="flex flex-col">
        <div className="flex p-4">
          <div className="flex-grow">
            Home
          </div>
          <div className="flex-none">
            <StarIcon className="w-4" />
          </div>
        </div>
        <Form />
        <div className="">
          {content}
        </div>
      </div>
    </>
  )
}
