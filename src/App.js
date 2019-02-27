import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AppHeader } from "./AppHeader";
import { TodosList } from "./TodosList";

const CREATE_TODO = gql`
  mutation CreateTodo($name: String!) {
    createTodo(name: $name) @client
  }
`;

function CreateTodo({ onCompleted }) {
  const [name, setName] = React.useState("");

  return (
    <Mutation mutation={CREATE_TODO} onCompleted={onCompleted}>
      {submit => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              submit({ variables: { name } });
            }}
          >
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </form>
        );
      }}
    </Mutation>
  );
}

function App() {
  const [addingTodo, setAddingTodo] = React.useState(false);

  return (
    <>
      <AppHeader />
      <main className="container">
        <TodosList />
        <button onClick={() => setAddingTodo(prev => !prev)}>
          Create Todo
        </button>
        {addingTodo && (
          <CreateTodo onCompleted={() => setAddingTodo(prev => !prev)} />
        )}
      </main>
    </>
  );
}

export default App;
