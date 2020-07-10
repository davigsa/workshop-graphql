const { ApolloServer, gql } = require("apollo-server");

const db = [
  { id: 0, name: "andre", email: "andre@test.com" },
  { id: 1, name: "dudu", email: "dudu@test.com" },
  { id: 2, name: "davi", email: "davi@test.com" },
];

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    getAllUsers: [User!]!
    getUserByName(name: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    deleteUserByName(name: String!): [User!]!
  }
`;

const resolvers = {
  Query: {
    getAllUsers: () => db,
    getUserByName(_, args) {
      return db.find((user) => user.name === args.name);
    },
  },

  Mutation: {
    createUser(_, args) {
      const newUser = {
        id: db.length,
        name: args.name,
        email: args.email,
      };
      db.push(newUser);
      return newUser;
    },
    deleteUserByName(_, args) {
      db = db.filter((user) => user.name !== args.name);
      return db;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`Graphql server is running at ${url}`));
