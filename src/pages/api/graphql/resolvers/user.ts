import { UserType } from "../../../../components/User"
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
    posts: async (parent: UserType) =>
      await prisma.post.findMany({
        where: {
          authorId: parent.id,
        }
      })
    ,
  }
}