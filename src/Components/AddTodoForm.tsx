import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/todoSlice";

const AddTodoForm: React.FunctionComponent = () => {
  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addTodoAsync({
      title: value,
    }));
  };
  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add Todo.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit" className="btn btn-purp mb-2">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
