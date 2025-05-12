import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { createTodo, updateTodo, deleteTodo } from "./graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getTodo, listTodos } from "./graphql/queries";

import awsExports from "./aws-exports";

const client = generateClient();

async function createTodoFn() {
  const result = await client.graphql({
    query: createTodo,
    variables: {
      input: {
        name: "todo task1",
        description: "description 111",
      },
    },
  });
}

async function updateTodoFn() {
  const result = await client.graphql({
    query: updateTodo,
    variables: {
      input: {
        id: "6261a7dc-e766-461e-9c50-c6c88d5f9258",
        description: "task desc",
      },
    },
  });
}

async function deleteTodoFn() {
  const result = await client.graphql({
    query: deleteTodo,
    variables: {
      input: {
        id: "6261a7dc-e766-461e-9c50-c6c88d5f9258",
      },
    },
  });
}

async function listTodoTasks() {
  const result = await client.graphql({
    query: listTodos,
  });
  console.log(result);
}

async function listOneTodoTask() {
  const result = await client.graphql({
    query: getTodo,
    variables: { id: "25b83afa-7888-434f-94e7-b20b6129df12" }
  });
  console.log(result);
}

Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator>
      {({ user, signOut }) => (
        <main>
          <h1>Welcome {user.username} !!!!!!!!!!</h1>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={createTodoFn}> Create </button>
          <button onClick={updateTodoFn}> Update </button>
          <button onClick={deleteTodoFn}> Delete </button>
          <button onClick={listTodoTasks}> List all tasks </button>
          <button onClick={listOneTodoTask}> List one task </button>
        </main>
      )}
    </Authenticator>
  );
};

export default App;
