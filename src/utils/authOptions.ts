import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions : NextAuthOptions = {

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({

    name: 'Credentials',
  
    credentials: {
      username: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
    
      const res = await fetch(`${process.env.BACKEND_URL}/auths/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return {
          id: user.data.auth._id,
          name: user.data.auth.name,     // Ensure API returns `name`
          email: user.data.auth.email,   // Ensure API returns `email`
          image: user.data.auth.image,   // Ensure API returns `image`
        };
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
  ],

  
  
  pages:{
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  
}

