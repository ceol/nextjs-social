import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  access_token: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    res.status(200).json({ access_token: "" })
  } else {
    res.status(400)
  }
}
