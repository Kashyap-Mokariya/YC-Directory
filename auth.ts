import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { AUTHOR_BY_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"

type User = {
  name?: string
  email?: string
  image?: string
}

type Profile = {
  id?: number | string
  sub?: string;  
  name?: string;  
  login?: string
  bio?: string
}

type JWT = {
  id?: string
  name?: string
  email?: string
  picture?: string
  sub?: string
  iat?: number
  exp?: number
  jti?: string
}

type Account = {
  provider?: string
  type?: string
}

type Session = {
  user?: {
    name?: string
    email?: string
    image?: string
  }
  expires: string
  id?: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!
    })
  ],
  callbacks: {
    async signIn({
      user,
      profile,
      account
    }: {
      user: User
      profile: Profile & { id?: string; login?: string; bio?: string }
      account: Account
    }) {
      const { name, email, image } = user
      let id = account.provider === "github" ? String(profile?.id) : profile?.sub // GitHub uses `id`, Google uses `sub`
      let username = account.provider === "github" ? profile?.login : profile?.name
      let bio = profile.bio || ""

      // Fetch existing author by id (GitHub or Google)
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_ID_QUERY, { id })

      // Create user in Sanity if not existing
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username,
          email,
          image,
          bio,
        })
      }

      return true
    },
    async jwt({
      token,
      account,
      profile
    }: {
      token: JWT
      account?: Account
      profile?: Profile
    }) {
      if (account && profile) {
        const userId = account.provider === "github" ? String(profile.id) : profile.sub
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_ID_QUERY, { id: userId })

        token.id = user?._id
      }

      return token
    },
    async session({
      session,
      token
    }: {
      session: Session
      token: JWT
    }) {
      Object.assign(session, { id: token.id })
      return session
    }
  }
})