# Construçao de um CRUD de Usuários e Postagens

1. Startar Servidor Apollo && printar Hello World

```
   const { ApolloServer, gql } = require("apollo-server");

   const typeDefs = gql`
     type Query {
       hello: String
     }
   `;

   const resolvers = {
     Query: {
       hello: () => "Hello World",
     },
   };

   const server = new ApolloServer({ typeDefs, resolvers });

   server.listen().then(({ url }) => console.log(`Graphql server started at ${url}`));
```

2. Criar Tipos da entidade User e Post

- Para a entidade Post falar sobre o aninhamento de tipos: _author: User!_

```
require("../config/db");
const User = require("../models/User");
const Post = require("../models/Post");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User!

    getAllPosts: [Post!]!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!): User!
    deleteUserById(id: ID!): [User!]!
  }
`;
```

3. Criar tipos da Mutation e explica tipo input

```
input UserInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input PostInput {
    title: String!
    body: String!
    author: String!
  }

  type Mutation {
    createUser(data: UserInput!): User!
    deleteUserById(id: ID!): [User!]!
    updateUserById(id: ID!, data: UserInput!): User!

    createPost(data: PostInput!): Post!
  }
```

4. Partir pros resolvers

```
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
```

5. E se por acaso a gente quisesse retornar o nome completo do user sem mexer no banco?

- Adicionamos o campo **fullName** nos tipos, sendo que ele retorna uma String;
- Criamos o resolver para User e nele inserimos como resolver o fullName, ou seja, uma função que retorna pelo **contexto** (o underline que ainda nao tinhamos usado) o firstName e o lastName;
- Agora se quisermos retornar o **fullName** de um User, nós podemos;

```
const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    email: String!
  }
`;

const resolvers = {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`,
  }
}
```

6. Apresentar o problema do author ao requisitar pelo _getAllPosts_

- Resolvemos esse problema do mesmo jeito que resolvemos o fullName, utilizando os **contextos**
- Adicionamos o Post no resolver e vamos resolver o campo author;
- Author utiliza o contexto do post, que é uma função que retorna do model de Usuário pelo Id os campos do User. (No caso, o id é igual ao post.author, pq ele recebe o ID do usuario)

```
const resolvers = {
  Post: {
    author: (post) => User.findById(post.author),
  }
}
```
