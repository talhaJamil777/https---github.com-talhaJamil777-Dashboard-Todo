import React, { useContext } from "react";
import { TodoContext, CheckedContext } from "./TodoContext.js";

const TodoItem = ({ text, index }) => {
  const { deleteTodo } = useContext(TodoContext);
  const { checked, toggleCheck } = useContext(CheckedContext);

  return (
    <li className="todo-item">
      <span>
        <input
          type="checkbox"
          checked={checked[index] || false}
          onChange={() => toggleCheck(index)}
        />
        <p className="todo-item-text">{text}</p>
      </span>
      <button
        onClick={() => deleteTodo(index)}
        className="btn btn-danger col-2 btn"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
