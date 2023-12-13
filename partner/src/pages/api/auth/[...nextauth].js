import axios from 'axios'
import { AuthUtils } from 'frontend-module'
import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post('/api/noauth/partner/signin', {
            email: credentials?.username,
            password: credentials?.password
          })

          const token = response?.data?.token
          if (!token) return null

          const user = AuthUtils.decodeJwt(token)
          if (!user) return null

          user.token = token
          return user
        } catch (error) {
          console.log('error.response', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token
      return session
    }
  },
  pages: {
    signIn: '/authentication/sign-in'
  }
}

export default NextAuth(authOptions)

export function auth(...args) {
  return getServerSession(...args, config)
}
