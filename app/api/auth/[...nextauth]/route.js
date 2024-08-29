// backend api routes - along with the frontend 
// we set up the providers such as the google authentication
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from '@models/user';

// creating handler to handle authentication
const handler = NextAuth( {
    // options object for "NextAuth"
    providers: [
        GoogleProvider({
            // options object for the "GoogleProvider"
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // the 'callbacks' - ?
        async session({session}){
            // asynch session function
            const sessionUser = await User.findOne({
                email: session.user.email,
            });
    
            // updating the session id - making sure we know which user is logged in
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            // asynch sign in function
            // to get user session - we need to sign in the user
            // every next.js route is a "serverless route" 
            try {
                // serverless -> lambda -> dynamodb
                // this lambda function only opens up when it's called -> makes connection to database when required
                await connectToDB();
    
                // check if a user already exists in the database
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                // if user does not exist in db - create a record
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
    
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
})

// usually we only export either as GET or POST - next-auth uses both however
// exports the handler function for both GET and POST http requests 
export {handler as GET, handler as POST};