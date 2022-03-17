import { Prisma } from "@prisma/client"
import { prisma } from "../db"

type Post = Prisma.PostGetPayload<{
  include: {
    likedBy: true,
    repostedBy: true,
  }
}>

type User = Prisma.UserGetPayload<{
  include: {
    id: true,
    likes: true,
    reposts: true,
  }
}>

export default {
  Post: {
    isLiked: async (parent: Post, args: any, context: any) => {
      const user: User = context?.user
      if (user && parent.likedBy) {
        return Boolean(parent.likedBy.find(likedUser => likedUser.id == user.id))
      }

      return false
    },
    isReposted: async (parent: Post, args: any, context: any) => {
      const user: User = context?.user
      if (user && parent.repostedBy) {
        return Boolean(parent.repostedBy.find(repostedUser => repostedUser.id == user.id))
      }

      return false
    },
  },
  Query: {
    post: async (parent: any, args: any, context: any, info: any) => {
      const user: User = context?.user
      return await prisma.post.findUnique({
        where: {
          id: args.id,
        },
        include: {
          author: true,
          likedBy: {
            where: {
              id: user?.id,
            }
          },
          repostedBy: {
            where: {
              id: user?.id,
            },
          },
          replies: {
            include: {
              author: true,
              likedBy: {
                where: {
                  id: user?.id,
                }
              },
              repostedBy: {
                where: {
                  id: user?.id,
                },
              }
            },
            orderBy: {
              datePosted: "desc",
            }
          },
        }
      })
    },

    homePosts: async (parent: any, args: any, context: any, info: any) => {
      const user: User = context?.user
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
        take: 50,
      })
    },
  },

  Mutation: {
    addPost: async (parent: any, args: any, context: any, info: any) => {
      const user: User = context?.user
      const parentId = args?.parentId
      if (user) {
        const post = await prisma.post.create({
          data: {
            content: args.content,
            authorId: user.id,
            parentId
          },
          include: {
            author: true,
            parent: true,
          }
        })

        if (parentId) {
          await prisma.post.update({
            data: {
              replyCount: {
                increment: 1
              }
            },
            where: {
              id: parentId
            }
          })
        }

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
      const user: User = context?.user
      if (user && !user.reposts.find(post => post.id === args.id)) {
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
          },
          include: {
            repostedBy: {
              where: {
                id: user.id,
              }
            }
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
      const user: User = context?.user
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
          },
          include: {
            repostedBy: {
              where: {
                id: user.id,
              }
            }
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
      const user: User = context?.user
      if (user && !user.likes.find(post => post.id === args.id)) {
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
          },
          include: {
            likedBy: {
              where: {
                id: user.id,
              }
            }
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
      const user: User = context?.user
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
          },
          include: {
            likedBy: {
              where: {
                id: user.id,
              }
            }
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