import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./Components/AddTodoForm";
import TodoList from "./Components/TodoList";
import TotalCompleteItems from "./Components/TotalCompleteItems";

function App() {
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
}

export default App;
