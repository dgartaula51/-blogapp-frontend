import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and confirm password do not match");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Create Account</h1>
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
      <input
        type="password"
        value={confirmPassword}
        placeholder="Re-enter your password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
};

export default CreateAccount;
