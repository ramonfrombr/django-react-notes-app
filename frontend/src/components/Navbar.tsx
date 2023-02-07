import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const jwt_cookie = Cookies.get("jwt");

  useLayoutEffect(() => {
    if (jwt_cookie) {
      axios
        .get("http://localhost:8000/user", { withCredentials: true })
        .then(function (response) {
          // handle success
          setUserEmail(response.data.email);
        })
        .catch(function (error) {
          // handle error
          alert(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, [jwt_cookie]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/login");
  };

  return (
    <div className="bg-slate-400 p-2 flex justify-between items-center">
      {jwt_cookie ? (
        <>
          <div>
            <Link
              className="bg-gray-500 p-1 rounded ml-2 text-white font-bold"
              to="/"
            >
              Home
            </Link>
            <Link
              className="bg-gray-500 p-1 rounded ml-2 text-white font-bold"
              to="results_history"
            >
              Results
            </Link>
          </div>
          <div className="flex items-center">
            <span className="bg-white p-1 rounded flex items-center">
              <FaUserAlt /> <span className="ml-2">{userEmail}</span>
            </span>
            <button
              className="bg-red-500 p-1 rounded ml-2 text-white font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div></div>
          <div>
            <Link
              className="bg-blue-600 p-1 rounded ml-2 text-white font-bold"
              to="login"
            >
              Login
            </Link>
            <Link
              className="bg-blue-500 p-1 rounded ml-2 text-white font-bold"
              to="register"
            >
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
