import { User, Prisma } from "@prisma/client"
import { prisma } from "../db"

type Post = Prisma.PostGetPayload<{
  include: {
    likedBy: true,
    repostedBy: true,
  }
}>

export default {
  Post: {
    isLiked: async (parent: Post, args: any, context: any) => {
      const user = context?.user
      if (user) {
        return Boolean(parent.likedBy.find(likedUser => likedUser.id == user.id))
      }

      return false
    },
    isReposted: async (parent: Post, args: any, context: any) => {
      const user = context?.user
      if (user) {
        return Boolean(parent.repostedBy.find(repostedUser => repostedUser.id == user.id))
      }

      return false
    },
  },
  Query: {
    posts: async () => {
      return await prisma.post.findMany({
        include: {
          author: true,
        },
        orderBy: {
          datePosted: "desc",
        },
        take: 20,
      })
    },

    post: async (parent: any, args: any, context: any, info: any) => {
      return await prisma.post.findUnique({
        where: {
          id: args.id,
        },
        include: {
          author: true,
        }
      })
    },

    homePosts: async (parent: any, args: any, context: any, info: any) => {
      const user = context?.user
      return await prisma.post.findMany({
        include: {
          author: true,
          likedBy: {
            where: {
              id: user?.id,
            },
          },
          repostedBy: {
            where: {
              id: user?.id,
            },
          },
        },
        orderBy: {
          datePosted: "desc",
        },
        take: 20,
      })
    },
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
        post: post,
      }
    },

    repostPost: async (parent: any, args: any, context: any, info: any) => {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          reposts: {
            where: {
              id: args.id,
            }
          }
        }
      })
      if (user && user.reposts.length == 0) {
        const post = await prisma.post.update({
          data: {
            repostCount: {
              increment: 1,
            },
            repostedBy: {
              connect: {
                id: user.id,
              }
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
      }

      return {
        code: "",
        success: false,
        message: "",
      }
    },

    unrepostPost: async (parent: any, args: any, context: any, info: any) => {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          reposts: {
            where: {
              id: args.id,
            }
          }
        }
      })
      if (user && user.reposts.length > 0) {
        const post = await prisma.post.update({
          data: {
            repostCount: {
              decrement: 1,
            },
            repostedBy: {
              disconnect: {
                id: user.id,
              }
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
      }

      return {
        code: "",
        success: false,
        message: "",
      }
    },

    likePost: async (parent: any, args: any, context: any, info: any) => {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          likes: {
            where: {
              id: args.id,
            }
          }
        }
      })
      if (user && user.likes.length == 0) {
        const post = await prisma.post.update({
          data: {
            likeCount: {
              increment: 1,
            },
            likedBy: {
              connect: {
                id: user.id,
              }
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
      }

      return {
        code: "",
        success: false,
        message: "",
      }
    },

    unlikePost: async (parent: any, args: any, context: any, info: any) => {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          likes: {
            where: {
              id: args.id,
            }
          }
        }
      })
      if (user && user.likes.length > 0) {
        const post = await prisma.post.update({
          data: {
            likeCount: {
              decrement: 1,
            },
            likedBy: {
              disconnect: {
                id: user.id,
              }
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
      }

      return {
        code: "",
        success: false,
        message: "",
      }
    },
  },
}