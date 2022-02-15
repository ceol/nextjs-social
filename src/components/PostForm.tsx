import React from "react"
import { useAddPost } from "../hooks"

export function PostForm() {
  const [contentState, setContentState] = React.useState("")
  const [addPostMutation] = useAddPost()

  function handleTextareaChange(event: React.SyntheticEvent<HTMLTextAreaElement>) {
    setContentState(event.currentTarget.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addPostMutation({
      variables: {
        content: contentState,
      },
      onCompleted(data) {
        if (data?.addPost.success) {
          setContentState("")
        }
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <textarea
        value={contentState}
        placeholder={"Make a new post"}
        onChange={handleTextareaChange}
        className="focus:outline-none p-3"
      />
      <button
        type="submit"
        className="grow-0 w-24 mr-2 p-1 rounded-2xl bg-gray-700 text-white font-bold self-end disabled:cursor-not-allowed disabled:opacity-20"
        disabled={!Boolean(contentState)}
      >
          Post
        </button>
    </form>
  )
}