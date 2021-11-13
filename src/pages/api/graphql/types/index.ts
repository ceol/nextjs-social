import { mergeTypeDefs } from "@graphql-tools/merge"
import { mutationResponseDefs } from "./mutationResponse"
import { postDefs } from "./post"
import { userDefs } from "./user"

const typeDefs = mergeTypeDefs([mutationResponseDefs, postDefs, userDefs])

export { typeDefs }