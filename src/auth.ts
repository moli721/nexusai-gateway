import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { LinuxDoProfile } from "@/types/linuxdo"

const linuxDoProvider = {
  id: "linuxdo",
  name: "LinuxDo",
  type: "oauth" as const,
  clientId: process.env.LINUXDO_CLIENT_ID,
  clientSecret: process.env.LINUXDO_CLIENT_SECRET,
  authorization: {
    url: "https://connect.linux.do/oauth2/authorize",
    params: { scope: "" }
  },
  token: "https://connect.linux.do/oauth2/token",
  userinfo: "https://connect.linux.do/api/user",
  checks: ["pkce", "state"] as ("pkce" | "state" | "none")[],
  profile(profile: LinuxDoProfile) {
    return {
      id: String(profile.id),
      name: profile.name || profile.username,
      email: null,
      image: profile.avatar_template?.replace("{size}", "120"),
      username: profile.username,
      trustLevel: profile.trust_level,
      silenced: profile.silenced,
      active: profile.active,
    }
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [linuxDoProvider],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username
        token.trustLevel = profile.trust_level
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.username = token.username as string
        session.user.trustLevel = token.trustLevel as number
      }
      return session
    },
  },
  session: { strategy: "jwt" },
})
