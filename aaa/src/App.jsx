import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LoginForm } from "./Components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./Components/MainPage";
import { Register } from "./Components/Register";
import { AddAncestor } from "./Components/AddAncestor";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Add" element={<AddAncestor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
