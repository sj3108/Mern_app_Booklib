import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";

import { Navbar } from "./componenet/Navbar";

import Home1 from "./pages/Home1";
import AddBook from "./pages/AddBook";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
