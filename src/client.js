import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import uuid from "uuid/v4";
import gql from "graphql-tag";

// Helper
const createTodo = ({ id = uuid(), name = "Todo", completed = false }) => ({
  id,
  name,
  completed,
  __typename: "Todo"
});

// Create Cache
const cache = new InMemoryCache();

// Setup the client
export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  resolvers: {
    Mutation: {
      createTodo: (_, { name }, { cache }) => {
        const query = gql`
          query GetTodos {
            todos @client {
              id
              name
              completed
            }
          }
        `;

        const previous = cache.readQuery({ query });
        const newTodo = createTodo({ name });
        const data = {
          todos: [...previous.todos, newTodo]
        };

        cache.writeQuery({ data, query });

        return newTodo;
      },

      toggleTodo: (_, { id: todoId }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: "Todo", id: todoId });
        const fragment = gql`
          fragment CompleteTodo on Todo {
            completed
          }
        `;

        const todo = cache.readFragment({ id, fragment });
        const data = { ...todo, completed: !todo.completed };
        cache.writeData({ id, data });
        return null;
      }
    }
  },
  typeDefs: gql`
    type Todo {
      id: ID!
      name: String!
      completed: Boolean!
    }

    type Mutation {
      createTodo(name: String!): Todo
    }
  `
});

const defaultTodos = [
  createTodo({ name: "Learn React", completed: true }),
  createTodo({ name: "Learn Vue", completed: true }),
  createTodo({ name: "Conquer the world", completed: false })
];

// Initialize the cache
cache.writeData({
  data: {
    todos: defaultTodos
  }
});
