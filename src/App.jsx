import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import QuizCreation from "./pages/QuizCreation";
import Practice from "./pages/Practice";
import Results from "./pages/Results";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<QuizCreation />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
