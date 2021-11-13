import { PostType } from "../../../../components/Post"
import { posts, users } from "../db"

export default {
  Query: {
    posts: () => posts,
    post(parent: any, args: any, context: any, info: any) {
      return posts.find(post => post.id === args.id)
    },
  },
  Post: {
    author: (parent: PostType) => users.filter(user => user.id === parent.author.id)
  }
}