import { UserType } from "../../../../components/User"
import { posts, users } from "../db"

export default {
  Query: {
    users: () => users,
    user(parent: any, args: any, context: any, info: any) {
      return users.find(user => user.id === args.id)
    },
  },
  User: {
    posts: (parent: UserType) => {
      return posts.filter(post => post.author.id === parent.id)
    }
  }
}