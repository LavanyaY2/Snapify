// Resolvers = functions that correspond to the defined queries and mutations in the schema

// Resolvers obj maps graphql's schema fields to functions that return the data for those fields
const resolvers = {
    Query: {

        users: async (_parent, _args, context) => {
            // check if user is authenticated
            if (!context.session) {
                console.log("User not authenticated");
            }

            // fetch user data using email
            return await context.dataSources.users.getAllUsers();
        },
    },


    //     users: async (_, __, { dataSources }) => {
    //         try {
    //             return await dataSources.users.fetchUsers();
    //         } catch (error) {
    //             console.log("Failed to fetch users");
    //         }
    //     },
    // },

    Mutation: {
        // createUser: async (_, { input }, { dataSources }) => {
        //     try {
        //         const newUser = await dataSources.users.createUser(input);
        //         return newUser;
        //     } catch (error) {
        //         console.log("Failed to create user");
        //     }
        // },
        createUser: async (_parent, { email, name }) => {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db(process.env.MONGODB_DB);
        
            const newUser = { email, name };
            await db.collection('users').insertOne(newUser);
        
            client.close();
            return newUser;
        },
    },
};

export default resolvers;