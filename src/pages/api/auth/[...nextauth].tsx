import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

const GOOGLE_ID =
  "663665301087-rirk8skltqmg458eeckk7pgrn2piac95.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const FACEBOOK_ID = "3152094808371160";
const FACEBOOK_SECRET = "db53ab649303dcc1de4da85e1e3c41d9";
const GITHUB_ID = "94f0d7830488102c95b2";
const GITHUB_SECRET = "a9e61fbd9e216c454942238824b0f772da275fd6";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID!,
      clientSecret: GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: FACEBOOK_ID,
      clientSecret: FACEBOOK_SECRET,
    }),
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
