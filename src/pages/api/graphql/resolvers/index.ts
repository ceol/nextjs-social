import { mergeResolvers } from "@graphql-tools/merge"
import scalar from "./scalar"
import post from "./post"
import user from "./user"

const resolvers = mergeResolvers([scalar, post, user])

export { resolvers }