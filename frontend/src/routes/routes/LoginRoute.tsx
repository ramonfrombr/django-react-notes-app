import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const LoginRoute = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:8000/login", {
        email,
        password,
      })
      .then(function (response) {
        Cookies.set("jwt", response.data.jwt, { expires: 7 });
        navigate("/");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  if (Cookies.get("jwt")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sm:w-[600px] mx-5 sm:mx-auto mt-[50px]">
      <h1 className="text-2xl mb-5">Login</h1>

      <div className="bg-gray-100 p-3">
        <div className="flex flex-col border p-3 mb-3">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="text"
          />
        </div>

        <div className="flex flex-col border p-3 mb-3">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </div>

        <button
          className="w-fit bg-blue-600 text-white font-bold p-3 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginRoute;
