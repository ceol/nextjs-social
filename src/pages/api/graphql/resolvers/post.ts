import { posts } from "../db"

export default {
  Query: {
    posts: () => posts,
    post(parent: any, args: any, context: any, info: any) {
      return posts.find(post => post.id === args.id)
    },
  },
}