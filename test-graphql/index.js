require("../config/db");
const { ApolloServer, gql } = require("apollo-server");
const User = require("../models/User");
const Post = require("../models/Post");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    email: String
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    author: User
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!

    getAllPosts: [Post!]!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String
  }

  input PostInput {
    title: String!
    body: String!
    author: String!
  }

  type Mutation {
    createUser(data: UserInput): User!
    deleteUserById(id: ID!): [User!]!
    updateUserById(id: ID!, data: UserInput!): User!

    createPost(data: PostInput!): Post!
  }
`;

const resolvers = {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`,
  },
  Post: {
    author: (post) => User.findById(post.author),
  },
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
    getAllPosts: async function () {
      try {
        return await Post.find();
      } catch (e) {
        console.error(e);
      }
    },
  },

  Mutation: {
    createUser: async function (_, { data }) {
      try {
        return await User.create(data);
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
    updateUserById: async function (_, { id, data }) {
      try {
        return await User.findByIdAndUpdate(id, data, { new: true });
      } catch (e) {
        console.error(e);
      }
    },
    createPost: async function (_, { data }) {
      try {
        return await Post.create(data);
      } catch (e) {
        console.error(e);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Graphql running at ${url}`));
