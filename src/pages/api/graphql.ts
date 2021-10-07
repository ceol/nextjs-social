import type { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"
import { initMiddleware } from "../../middleware"
import { getServerHandler } from "../../graphql/server"

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