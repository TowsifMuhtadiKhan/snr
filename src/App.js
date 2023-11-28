import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Edit from "./components/Edit";
import Login from "./components/Login"; // Import the Edit component // Import the Edit component
import Variable from "./components/Variable";
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/posts" element={<Edit />} />
          <Route path="/" element={<Card />} />
          <Route path="/posts/:id" element={<Edit />} /> 
          <Route path="/auth/login" element={<Login />} /> 
          <Route path="/" element={<Navbar />} />
          <Route path="/" element={<Footer />} />
          <Route path="/content-variable" element={<Variable />} /> 
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;