import NextAuth from "next-auth/next";
import FacebookProviders from "next-auth/providers/facebook";
import GoogleProviders from "next-auth/providers/google";
import GitHubProviders from "next-auth/providers/github";
import TwitterProviders from "next-auth/providers/twitter";
const FACEBOOK_CLIENT_ID = "722651002521185";
const FACEBOOK_CLIENT_SECRET = "548dfa3f152a05037044cb04fdf942ae";
const TWITTER_CLIENT_ID = "722651002521185";
const TWITTER_CLIENT_SECRET = "548dfa3f152a05037044cb04fdf942ae";
const GOOGLE_CLIENT_ID =
  "105210076264-5q0egj5q9d77eunp44pb1ov14126pmkc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "f3f227f5b31f6f38803b";
const GITHUB_CLIENT_SECRET = "d44c0d3e6b4817b94c422f87d8bb13682d604ef7";

const SECRET =
  "# Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32";
export default NextAuth({
  providers: [
    GoogleProviders({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProviders({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),

    TwitterProviders({
      clientId: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
    }),

    GitHubProviders({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: SECRET,
  jwt: {
    secret: SECRET,
  },
  pages: {
    signIn: "/",
    signOut: "/login",
  },
});
