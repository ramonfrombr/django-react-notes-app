import axios from "axios";
import React, { useState } from "react";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const RegisterRoute = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleRegister = () => {
    axios
      .post("http://localhost:8000/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        alert("Account created succesfully");
        setRedirect(true);
      })
      .catch((error: any) => alert(error));
  };

  if (Cookies.get("jwt")) {
    return <Navigate to="/" replace />;
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="sm:w-[600px] mx-5 sm:mx-auto mt-[50px]">
      <h1 className="text-2xl mb-5">Register</h1>

      <div className="bg-gray-100 p-3">
        <div className="flex flex-col border p-3 mb-3">
          <label htmlFor="email">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
          />
        </div>

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
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterRoute;
