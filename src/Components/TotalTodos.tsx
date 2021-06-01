import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";

const TotalTodos: React.FC = () => {
  const todos = useSelector((state: RootStateOrAny) => state.todos);
  return <>Total Items: {todos.length}</>;
};

export default TotalTodos;
