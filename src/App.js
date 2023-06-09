import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";

function App() {
  // eslint-disable-next-line
  const [host, setHost] = useState("http://localhost:3001");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login host={host} />} />
        <Route path="/signup" element={<Register host={host} />} />
      </Routes>
    </div>
  );
}

export default App;
