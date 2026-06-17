import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Account created successfully 🚀");

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed"
      );
    }
  };


  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <p>
          Join library management system
        </p>


        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />


        <button type="submit">
          Signup
        </button>


        <span>
          Already have account?
          <Link to="/login">
            Login
          </Link>
        </span>

      </form>

    </div>
  );
};

export default Signup;