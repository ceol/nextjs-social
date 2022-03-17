import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import { prisma } from "../graphql/db"

const AdminProvider = Credentials({
  // The name to display on the sign in form (e.g. 'Sign in with...')
  name: "User Selection",
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: { label: "Email", type: "email", placeholder: "name@example.com" },
  },
  async authorize(credentials, req) {
    // You need to provide your own logic here that takes the credentials
    // submitted and returns either a object representing a user or value
    // that is false/null if the credentials are invalid.
    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    // You can also use the `req` object to obtain additional parameters
    // (i.e., the request IP address)
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: credentials?.email
        }
      }
    })

    if (user) {
      return user
    }

    // Return null if user data could not be retrieved
    return null
  }
})

const GitHubProvider = GitHub({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
})

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    AdminProvider
  ],

  pages: {
    signIn: "/auth/admin-signin",
  }
})