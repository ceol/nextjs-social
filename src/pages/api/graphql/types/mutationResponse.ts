import { gql } from "apollo-server"

export const mutationResponseDefs = gql`

interface MutationResponse {
  code: String!
  success: Boolean!
  message: String!
}

`