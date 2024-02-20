import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.name) {
          throw new Error("Invalid name");
        }

        await connectToDB()

        const user = await User.findOne({ name: credentials.name });

        if (!user) {
          throw new Error("Invalid name");
        }
        return user
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({session}) {
      const mongodbUser = await User.findOne({ name: session.user.name })
      session.user.id = mongodbUser._id.toString()

      session.user = {...session.user, ...mongodbUser._doc}

      return session
    }
  },
  session: {
    strategy: "jwt",
},
debug: process.env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
