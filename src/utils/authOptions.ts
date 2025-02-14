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
    
      const res = await fetch(`https://personal-portfolio-blog-website-server.vercel.app/api/auths/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
        cache: 'no-store'
      })
      const user = await res.json()
console.log(user)
      
      if (res.ok && user) {
        return {
          id: user.data.auth._id,
          name: user.data.auth.name,     
          email: user.data.auth.email,   
          image: user.data.auth.image,   
        };
      }
      
      return null
    }
  })
  ],

  
  
  pages:{
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  
}

