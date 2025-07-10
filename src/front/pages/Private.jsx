import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token-jwt");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPrivateData = async () => {
      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "private", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!resp.ok) {
          throw new Error("Token inválido o expirado");
        }

        const data = await resp.json();
        setUserEmail(data.msg);
        setLoading(false);
      } catch (err) {
        console.error(err);
        sessionStorage.removeItem("token-jwt");
        navigate("/login");
      }
    };

    fetchPrivateData();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container text-center mt-5">
      <h1>Área privada</h1>
      <p>{userEmail}</p>
    </div>
  );
};