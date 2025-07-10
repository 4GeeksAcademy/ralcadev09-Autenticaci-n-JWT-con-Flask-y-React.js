import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Credenciales inválidas");
        setLoading(false);
        return;
      }

      // Guardar token y redirigir
      sessionStorage.setItem("token-jwt", data.token);
      navigate("/private");

    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input 
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input 
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};