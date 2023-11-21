import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Edit from "./components/Edit"; // Import the Edit component

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/posts" element={<Edit />} />
          <Route path="/" element={<Card />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;