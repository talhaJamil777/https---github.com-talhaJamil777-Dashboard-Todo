import React, { useState , useEffect,useRef} from "react";
import Sidebar from "./Sidebar";
import TodoItem from "./todolist";
import "./style.css";
import { TodoContext, CheckedContext } from './TodoContext';

function Home() {
  const [selectedSection, setSelectedSection] = useState("Welcome");

  // todo list 

  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([]);
  const [input, setInput] = useState('');
  const Button = ({ onClick }) => {
    return (
        <button onClick={onClick} className="todo-button"> Add Todo</button>
    );
}

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedChecked = JSON.parse(localStorage.getItem('checked')) || [];
    setTodos(savedTodos);
    setChecked(savedChecked);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setChecked([...checked, false]);
    setInput('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setChecked(checked.filter((_, i) => i !== index));
  };

  const toggleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  return (  
    <TodoContext.Provider value={{ todos, setTodos, deleteTodo }}>
       <CheckedContext.Provider value={{ checked, toggleCheck }}>
        <Home />
        <div className="todo-container">
          <input
            className="todo-input"
            placeholder="Add Todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <Button onClick={addTodo} />
          <ul>
            {todos.map((todo, index) => (
              <TodoItem key={index} text={todo} index={index} />
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onSelectSection={setSelectedSection} />
      <div style={{ flex: 1, padding: "20px" }}>  
        <h1>{selectedSection} Todo List</h1>
        <p>This is {selectedSection} List</p>
      </div>
    </div> 
      </CheckedContext.Provider>
      </TodoContext.Provider>
  );
}

export default Home;
