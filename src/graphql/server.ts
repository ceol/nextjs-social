import { ApolloServer } from "apollo-server-micro"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import { MicroRequest } from "apollo-server-micro/dist/types"
import { ServerResponse } from "http"

const server = new ApolloServer({ typeDefs, resolvers })
let _serverHandler: (req: MicroRequest, res: ServerResponse) => Promise<void>

async function getServerHandler() {
  if (! _serverHandler) {
    _serverHandler = await server.start().then(() => server.createHandler({ path: "/api/graphql" }))
  }
  return _serverHandler
}

export { getServerHandler }