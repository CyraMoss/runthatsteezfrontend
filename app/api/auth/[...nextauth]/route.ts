import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../../lib/prisma'; // Adjust the import path according to your structure
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john.doe@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('No credentials provided');
          throw new Error('No credentials provided');
        }
      
        const { email, password } = credentials;
      
        console.log('Connecting to database...');
        const user = await prisma.user.findUnique({
          where: { email },
        });
      
        if (!user) {
          console.log(`No user found with email: ${email}`);
          throw new Error('No user found with this email');
        }
      
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.log('Invalid password');
          throw new Error('Invalid password');
        }
      
        console.log('User authorized:', user);
      
        // Return user object
        return user;
      }
      
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
