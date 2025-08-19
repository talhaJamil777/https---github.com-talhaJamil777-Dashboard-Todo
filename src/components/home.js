import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import TodoItem from "./todolist";
import "./style.css";
import { TodoContext } from "./TodoContext";

function Home() {
  const [selectedSection, setSelectedSection] = useState("Welcome");

  const [todos, setTodos] = useState({});
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim() || selectedSection === "Welcome") return;

    setTodos(prev => ({
      ...prev,
      [selectedSection]: [...(prev[selectedSection] || []), input]
    }));

    setInput('');
  };

  const deleteTodo = (index, section) => {
    setTodos(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, deleteTodo }}>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar onSelectSection={setSelectedSection} />

        <div style={{ flex: 1, padding: "20px" }}>
          <h1>{selectedSection} Todo List</h1>
          <p>This is {selectedSection} List</p>

          {selectedSection !== "Welcome" && (
            <div className="todo-container">
              <input
                className="todo-input"
                placeholder="Add Todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
              />
              <button onClick={addTodo} className="todo-button">Add Todo</button>

              <ul>
                {(todos[selectedSection] || []).map((todo, index) => (
                  <TodoItem 
                    key={index} 
                    text={todo} 
                    index={index} 
                    section={selectedSection} 
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default Home;
