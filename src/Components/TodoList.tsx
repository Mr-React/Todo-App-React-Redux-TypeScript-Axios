import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";

function TodoList(){
  const dispatch = useDispatch();
  const todos = useSelector((state: RootStateOrAny) => state.todos);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
  return (
    <ul className="list-group">
      {todos.map((todo: any) => (
        <TodoItem
          key={todo.todoId}
          todoId={todo.todoId}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
}

export default TodoList;
 