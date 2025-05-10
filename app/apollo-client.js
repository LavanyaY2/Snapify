// To integrate GraphQL
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create instance of ApolloClient
const client = new ApolloClient({
    ssrMode: true, // server-side rendering enabled
    link: new HttpLink({
        uri: 'http://localhost:3000/api/graphql', // the api endpoint (url of the graphql server) we will setup
        fetch,
    }),
    cache: new InMemoryCache(), // an instance of InMemoryCache used by Apollo Client to cache qyery results after fetching
});

export default client;