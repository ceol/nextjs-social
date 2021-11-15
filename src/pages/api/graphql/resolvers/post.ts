import { prisma } from "../db"

export default {
  Query: {
    posts: async () => await prisma.post.findMany({
      include: {
        author: true,
      }
    }),
    post: async (parent: any, args: any, context: any, info: any) =>
      await prisma.post.findUnique({
        where: {
          id: args.id,
        },
        include: {
          author: true,
        }
      })
    ,
  },
}