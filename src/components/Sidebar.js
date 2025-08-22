import React, { useContext } from "react";
import { SectionContext } from "./SectionContext";
import { TodoContext } from "./TodoContext"; 

const Sidebar = ({ onSelectSection }) => {
  const { sections, addSection, deleteSection } = useContext(SectionContext);
  const { todos, setTodos } = useContext(TodoContext); 

  const SectionAdd = () => {
    const name = prompt("Enter new section name:");
    if (name && name.trim() !== "") {
      addSection(name.trim());
    }
  };

  const handleDelete = (index, sectionName) => {
    deleteSection(index);

    const updatedTodos = { ...todos };
    delete updatedTodos[sectionName];
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div
      style={{
        width: "200px",
        background: "#2c3e50",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ color: "#FFFFFF" }}>Sections</h3>

      {sections.map((section, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
          <button
            style={{
              flex: 1,
              padding: "8px",
              background: "#ddd",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => onSelectSection(section)}
          >
            {section}
          </button>

          <button
            style={{
              marginLeft: "5px",
              padding: "8px",
              background: "#e74c3c",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(index, section)}
          >
            &#x2716;
          </button>
        </div>
      ))}

      <button
        style={{
          marginTop: "auto",
          padding: "8px",
          background: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={SectionAdd}
      >
        + Add Section
      </button>
    </div>
  );
};

export default Sidebar;
