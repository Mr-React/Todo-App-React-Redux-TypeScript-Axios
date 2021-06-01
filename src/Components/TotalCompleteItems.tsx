import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import TotalTodos from "./TotalTodos";

const TotalCompleteItems: React.FC = () => {
  const todos = useSelector((state: RootStateOrAny) =>
    state.todos.filter((todo: any) => todo.completed === true)
  );
  return <h4 className="mt-3">Total Complete Items: {todos.length} <span className="span-ok"><TotalTodos/></span></h4>;
};

export default TotalCompleteItems;
