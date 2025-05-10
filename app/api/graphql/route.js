import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import Users from "./datasources";
import User from "@models/user";

// import the session - for auth
import { getSession } from "next-auth/react";

import { connectToDB } from "@utils/database";

// Connect to MongoDB 
await connectToDB();

// Initialize Apollo Server
const server = new ApolloServer({
    resolvers,
    typeDefs,

    context: async ({req}) => {
        // get session (authenticated user)
        const session = await getSession({req});

        return {
            session,
            dataSources: {
                uesrs: new Users({modelOrCollection: User}),
            },
        };
    },
});

// Create a Next.js-compatible handler
const handler = startServerAndCreateNextHandler(server);
// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//     // config object
//     context: async (req, res) => ({
//         req,
//         res,
//         dataSources: {
//             users: new Users({modelOrCollection: User}),
//         },
//     }),
// });


// Handle GET and POST requests
export async function GET(request){
    return handler(request);
}

export async function POST(request){
    return handler(request);
}