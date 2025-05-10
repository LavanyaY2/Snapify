import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    image: String!
  }

  input NewUserInput {
    email: String!
    username: String!
    image: String!
  }

  type Post {
    id: ID!
    creator: String!
    prompt: String!
    tag: String!
    myFile: String!
  }

  input NewPostInput {
    prompt: String!
    tag: String!
    myFile: String!
  }

  type Query {
    users: [User]
    posts: [Post]  # Ensure this returns a list of Post
  }

  type Mutation {
    createUser(input: NewUserInput!): User
    createPost(input: NewPostInput!): Post  # Ensure this returns a Post type
  }
`;

export default typeDefs;
