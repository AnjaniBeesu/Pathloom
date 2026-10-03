import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const publicHttps = process.env.NEXTAUTH_URL?.startsWith("https://") === true || process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true;
const securePrefix = publicHttps ? "__Secure-" : "";
const sameSite = publicHttps ? "none" : "lax";
const cookieOptions = { httpOnly: true, sameSite, secure: publicHttps, path: "/" } as const;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: { params: { scope: "read:user public_repo" } }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: publicHttps,
  cookies: {
    sessionToken: { name: `${securePrefix}next-auth.session-token`, options: cookieOptions },
    callbackUrl: { name: `${securePrefix}next-auth.callback-url`, options: { ...cookieOptions, httpOnly: false } },
    csrfToken: { name: `${publicHttps ? "__Host-" : ""}next-auth.csrf-token`, options: cookieOptions }
  },
  pages: { signIn: "/app" }
};
