import React from "react";
import { Query, Mutation } from "react-apollo";
import { Switch } from "./Switch";
import gql from "graphql-tag";

export const GET_TODOS = gql`
  query Todos {
    todos @client {
      id
      name
      completed
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) @client
  }
`;

export function TodoItem({ todo }) {
  return (
    <Mutation mutation={TOGGLE_TODO}>
      {submit => {
        return (
          <li className="card">
            <p>Name: {todo.name}</p>
            <div className="center">
              Completed:{" "}
              <Switch
                id={todo.id}
                checked={todo.completed}
                onChange={e => submit({ variables: { id: todo.id } })}
              />
            </div>
          </li>
        );
      }}
    </Mutation>
  );
}

export function TodosList(props) {
  return (
    <Query query={GET_TODOS}>
      {({ data }) => {
        console.log(data);
        return (
          <ul>
            {data.todos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        );
      }}
    </Query>
  );
}
