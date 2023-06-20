import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        value={email}
        placeholder="Your email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <Link to="/create-account">Create new account here</Link>
    </>
  );
};

export default Login;
