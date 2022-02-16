import { UserCircleIcon } from "@heroicons/react/outline"
import React from "react"
import { useAddPost } from "../../hooks"

type Props = {
  parentId?: string
  placeholder?: string
}

export function Form({ parentId, placeholder = "Make a new post" }: Props) {
  const [contentState, setContentState] = React.useState("")
  const [addPostMutation] = useAddPost()

  function handleTextareaChange(event: React.SyntheticEvent<HTMLTextAreaElement>) {
    setContentState(event.currentTarget.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addPostMutation({
      variables: {
        content: contentState.trim(),
        parentId
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
      <div className="flex gap-2 px-3">
        <UserCircleIcon className="flex-none w-12 text-gray-400" />
        <textarea
          value={contentState}
          placeholder={placeholder}
          onChange={handleTextareaChange}
          className="flex-grow focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="grow-0 w-24 mr-4 p-1 rounded-2xl bg-gray-700 text-white font-bold self-end disabled:cursor-not-allowed disabled:opacity-20"
        disabled={!Boolean(contentState.trim())}
      >
          Post
        </button>
    </form>
  )
}