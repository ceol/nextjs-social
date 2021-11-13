import { mergeResolvers } from "@graphql-tools/merge"
import post from "./post"
import user from "./post"

const resolvers = mergeResolvers([post, user])

export { resolvers }