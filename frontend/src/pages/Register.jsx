import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3d393f]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-white text-2xl mb-6 text-center">Register</h2>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded mb-4 bg-[#3d3d3d] text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 bg-[#3d3d3d] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-4 bg-[#3d3d3d] text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
