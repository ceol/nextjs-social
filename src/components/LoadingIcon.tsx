import { DotsHorizontalIcon } from "@heroicons/react/outline";

type Props = {

}

export function LoadingIcon({}: Props) {
  return (
    <div className="flex justify-center py-2">
      <DotsHorizontalIcon className="w-8" />
    </div>
  )
}