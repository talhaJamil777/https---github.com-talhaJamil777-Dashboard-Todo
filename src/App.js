import React, { useState, useEffect } from "react";
import Home from "./components/home";
import "./components/style.css";
import { SectionContext } from "./components/SectionContext";

function App() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const savedSections = JSON.parse(localStorage.getItem("sections")) || [];
    setSections(savedSections);
  }, []);

  const addSection = (name) => {
    if (name && !sections.includes(name)) {
      const updated = [...sections, name];
      setSections(updated);
      localStorage.setItem("sections", JSON.stringify(updated));
    }
  };

  const deleteSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
    localStorage.setItem("sections", JSON.stringify(updated));
  };

  


  return (
    <SectionContext.Provider value={{ sections, addSection, deleteSection }}>
      <Home />
    </SectionContext.Provider>
    
  );
}

export default App;
