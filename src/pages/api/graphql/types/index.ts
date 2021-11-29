import { mergeTypeDefs } from "@graphql-tools/merge"
import { scalarDefs } from "./scalar"
import { mutationResponseDefs } from "./mutationResponse"
import { postDefs } from "./post"
import { userDefs } from "./user"

const typeDefs = mergeTypeDefs([scalarDefs, mutationResponseDefs, postDefs, userDefs])

export { typeDefs }