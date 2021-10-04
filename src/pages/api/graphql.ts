import type { NextApiRequest, NextApiResponse } from "next"
import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "cors"

function initMiddleware(middleware: any) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(Cors({
  methods: ["GET", "POST",],
}))

const typeDefs = gql`
  type User {
    displayName: String
    userName: String
    posts: [Post]
  }

  type Post {
    id: ID
    content: String
    author: User
  }

  type Query {
    posts: [Post]
  }
`

const posts = [...Array(20)].map((v, i) => {
  const id = i + 1
  return {
    id: `${id}`,
    content: `Content for post #${id}`,
  }
})

const resolvers = {
  Query: {
    posts: () => posts,
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
let _serverHandler: (req: any, res: any) => Promise<void>

async function getServerHandler() {
  if (! _serverHandler) {
    _serverHandler = await server.start().then(() => server.createHandler({ path: "/api/graphql" }))
  }
  return _serverHandler
}

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res)

  const serverHandler = await getServerHandler()
  return serverHandler(req, res)
}