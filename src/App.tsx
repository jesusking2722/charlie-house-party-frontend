import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Container } from "./components";
import { Login, Register } from "./pages";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Container>
  );
}

export default App;
