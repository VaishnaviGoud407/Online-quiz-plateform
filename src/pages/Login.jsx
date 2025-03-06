import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      navigate("/create");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        className="form-control my-3"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
