import ky from "ky"

export function fetcher(url: string) {
  return ky.get(url).json()
}