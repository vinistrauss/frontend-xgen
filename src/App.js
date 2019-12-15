import React from "react";
import Header from "./components/Header";
import Routes from "./routes";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes></Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
