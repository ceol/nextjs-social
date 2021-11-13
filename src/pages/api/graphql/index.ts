import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { ApolloServer } from "apollo-server-micro"
import Cors from "cors"
import { initMiddleware } from "../../../middleware"
import { resolvers } from "./resolvers"
import { typeDefs } from "./types"

const apolloServer = new ApolloServer({ typeDefs, resolvers })
let apolloServerHandler: NextApiHandler

async function getServerHandler() {
  if (! apolloServerHandler) {
    apolloServerHandler = await apolloServer.start().then(() => apolloServer.createHandler({ path: "/api/graphql" }))
  }
  return apolloServerHandler
}

// Apollo Studio's Explorer Sandbox requires CORS
// This can be removed if the sandbox is no longer used
const cors = initMiddleware(Cors({
  methods: ["GET", "POST",],
}))

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