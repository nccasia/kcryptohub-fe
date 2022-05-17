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
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account }) {
      if (account.access_token) {
        switch (account.provider) {
          case ELoginProvider[ELoginProvider.GITHUB].toLowerCase():
            authApi.logInGithub({
              email: user.email,
              accessToken: account.access_token,
            });
            break;
          case ELoginProvider[ELoginProvider.GOOGLE].toLowerCase():
            authApi.logInGoogle({
              name: user.name,
              email: user.email,
              accessToken: account.id_token,
              provider: "google",
            });
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
