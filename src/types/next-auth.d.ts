import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      trustLevel: number
    } & DefaultSession["user"]
  }

  interface Profile {
    username: string
    trust_level: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string
    trustLevel?: number
  }
}
