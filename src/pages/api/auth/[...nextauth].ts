import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { ELoginProvider } from "@/type/auth/login.type";
import { authApi } from "@/api/auth-api";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.provider = token.sub;
      return session;
    },
    async signIn({ user, account }) {
      if (account.access_token) {
        if (account.provider === "google") {
          account.access_token = account.id_token;
        }
        return true;
      } else {
        return "/login";
      }
    },
  },

});
