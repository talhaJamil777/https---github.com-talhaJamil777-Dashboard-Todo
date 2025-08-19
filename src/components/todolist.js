import React, { useContext } from "react";
import { TodoContext } from "./TodoContext";

const TodoItem = ({ text, index, section }) => {
  const { deleteTodo } = useContext(TodoContext);

  return (
    <li className="todo-item">
      <span>{text}</span>
      <button onClick={() => deleteTodo(index, section)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
