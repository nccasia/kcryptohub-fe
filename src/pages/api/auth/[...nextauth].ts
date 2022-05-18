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
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.provider = token.provider;
      return session;
    },
    async signIn({ user, account }) {
      if (account.access_token) {
        switch (account.provider) {
          case ELoginProvider[ELoginProvider.GITHUB].toLowerCase():
            break;
          case ELoginProvider[ELoginProvider.GOOGLE].toLowerCase():
            break;
          default:
            break;
        }
        return true;
      } else {
        return "/login";
      }
    },
  },
});
