import ky from "ky"
import { QueryFunctionContext } from "react-query"


export async function defaultQueryFn({ queryKey }: QueryFunctionContext) {
  const url: string = queryKey[0] as string
  return ky.get(url).json()
}