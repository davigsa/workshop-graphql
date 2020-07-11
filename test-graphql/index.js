require("../config/db");
const { ApolloServer, gql } = require("apollo-server");
const User = require("../models/User");

//Declarando types grapqhql
const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    deleteUserById(id: ID!): [User!]!
    updateUserById(id: ID!, name: String!, email: String!): User!
  }
`;

//Criando resolvers graphql
const resolvers = {
  Query: {
    getAllUsers: async function () {
      try {
        return await User.find();
      } catch (e) {
        console.error(e);
      }
    },
    getUserById: async function (_, args) {
      try {
        return await User.findById(args.id);
      } catch (e) {
        console.error(e);
      }
    },
  },

  Mutation: {
    createUser: async function (_, args) {
      try {
        return await User.create({
          name: args.name,
          email: args.email,
        });
      } catch (e) {
        console.error(e);
      }
    },
    deleteUserById: async function (_, args) {
      try {
        await User.findByIdAndDelete(args.id);
        return User.find();
      } catch (e) {
        console.error(e);
      }
    },
    updateUserById: async function (_, args) {
      try {
        return await User.findByIdAndUpdate(args.id, {
          name: args.name,
          email: args.email,
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`Graphql server is running in ${url}`));
