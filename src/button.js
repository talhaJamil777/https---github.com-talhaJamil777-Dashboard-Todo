import React from "react";  

const Button = ({ onClick }) => {
    return (
        <button onClick={onClick} className="todo-button"> Add Todo</button>
    );
}
export default Button;
