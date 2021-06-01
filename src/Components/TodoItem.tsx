import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompleteAsync, deleteTodoAsync } from "../redux/todoSlice";

interface Propser {
  todoId: number;
  title?: string;
  completed?: boolean;
}

const TodoItem: React.FunctionComponent<Propser> = ({
  todoId,
  title,
  completed,
}) => {
  const dispatch = useDispatch();

  const handleComplete = (): void => {
    dispatch(toggleCompleteAsync({ todoId: todoId, completed: !completed }));
  };
  const handleDelete = (): void => {
    dispatch(
      deleteTodoAsync({
        todoId: todoId,
      })
    );
  };

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            onChange={handleComplete}
            checked={completed}
          ></input>
          {title}
        </span>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
