import React, { useState } from "react";
import TodoListApp from "./Components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>
      <TodoListApp darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
