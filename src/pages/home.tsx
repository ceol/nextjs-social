import { SunIcon } from "@heroicons/react/outline"
import Head from "next/head"
import { HomeList } from "../components/HomeList"
import { Form } from "../components/Post/Form"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Social</title>
      </Head>
      <div className="flex flex-col gap-4">
        <div className="flex p-4">
          <div className="flex-grow">
            Home
          </div>
          <div className="flex-none">
            <SunIcon className="w-4" />
          </div>
        </div>
        <Form />
        <HomeList />
      </div>
    </>
  )
}
