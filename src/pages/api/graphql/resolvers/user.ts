import { UserData } from "../../../../types"
import { prisma } from "../db"

export default {
  User: {
    posts: async (parent: UserData) => (
      await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
        include: {
          author: true,
          repostedBy: {
            where: {
              id: parent.id,
            }
          },
          likedBy: {
            where: {
              id: parent.id,
            }
          },
        },
        orderBy: {
          datePosted: "desc",
        },
      })
    ),

    isFollowing: async (parent: UserData, args: any, context: any, info: any) => {
      const user = context?.user
      if (user) {
        return await prisma.user.count({
          where: {
            id: user.id,
            following: {
              some: {
                id: parent.id
              }
            }
          }
        }) > 0
      }
    },

    isFollowedBy: async (parent: UserData, args: any, context: any, info: any) => {
      const user = context?.user
      if (user) {
        return await prisma.user.count({
          where: {
            id: user.id,
            followedBy: {
              some: {
                id: parent.id
              }
            }
          }
        }) > 0
      }
    },
  },

  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (parent: any, args: { userName: string }, context: any, info: any) => {
      return await prisma.user.findUnique({
        where: {
          userName: args.userName,
        },
        include: {
          posts: {
            include: {
              author: true,
              repostedBy: {
                where: {
                  userName: args.userName,
                }
              },
              likedBy: {
                where: {
                  userName: args.userName,
                }
              },
            },
            take: 50,
          },
          following: true,
          followedBy: true,
        },
      })
    },
  },

  Mutation: {
    follow: async (parent: any, args: { id: string }, context: any, info: any) => {

    },
    unfollow: async (parent: any, args: { id: string }, context: any, info: any) => {

    },
  }
}