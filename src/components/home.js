import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Home() {
  const [selectedSection, setSelectedSection] = useState("Welcome");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onSelectSection={setSelectedSection} />
      <div style={{ flex: 1, padding: "20px" }}>  
        <h1>{selectedSection} Todo List</h1>
        <p>This is {selectedSection} List</p>
      </div>
    </div>   
  );
}

export default Home;
