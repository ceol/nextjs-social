import { UserData } from "../../../../types"
import { prisma } from "../db"

export default {
  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (parent: any, args: any, context: any, info: any) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        }
      })
    ,
  },
  User: {
    posts: async (parent: UserData) =>
      await prisma.post.findMany({
        where: {
          authorId: parent.id,
        }
      })
    ,
  }
}