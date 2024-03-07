import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    // Providers...
  ],
});

export { handler as GET, handler as POST };
