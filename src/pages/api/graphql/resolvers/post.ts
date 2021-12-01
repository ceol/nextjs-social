import { prisma } from "../db"

export default {
  Query: {
    posts: async () => await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        datePosted: "desc",
      },
      take: 20,
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
  Mutation: {
    addPost: async (parent: any, args: any, context: any, info: any) => {
      const user = await prisma.user.findFirst()
      if (user) {
        const post = await prisma.post.create({
          data: {
            content: args.content,
            authorId: user.id,
          }
        })

        return {
          code: "",
          success: true,
          message: "",
          post: post,
        }
      }

      return {
        code: "",
        success: false,
        message: "",
      }
    },

    deletePost: async (parent: any, args: any, context: any, info: any) => {
      const post = await prisma.post.delete({
        where: {
          id: args.id,
        },
      })

      return {
        code: "",
        success: true,
        message: "",
      }
    },

    boostPost: async (parent: any, args: any, context: any, info: any) => {
      const post = await prisma.post.update({
        data: {
          boostCount: {
            increment: 1,
          }
        },
        where: {
          id: args.id,
        }
      })

      return {
        code: "",
        success: true,
        message: "",
        post: post,
      }
    },

    unboostPost: async (parent: any, args: any, context: any, info: any) => {
      const post = await prisma.post.update({
        data: {
          boostCount: {
            decrement: 1,
          }
        },
        where: {
          id: args.id,
        }
      })
      return {
        code: "",
        success: true,
        message: "",
        post: post,
      }
    },

    likePost: async (parent: any, args: any, context: any, info: any) => {
      const post = await prisma.post.update({
        data: {
          likeCount: {
            increment: 1,
          }
        },
        where: {
          id: args.id,
        }
      })

      return {
        code: "",
        success: true,
        message: "",
        post: post,
      }
    },

    unlikePost: async (parent: any, args: any, context: any, info: any) => {
      const post = await prisma.post.update({
        data: {
          likeCount: {
            decrement: 1,
          }
        },
        where: {
          id: args.id,
        }
      })

      return {
        code: "",
        success: true,
        message: "",
        post: post,
      }
    },
  },
}