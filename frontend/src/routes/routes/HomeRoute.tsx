import React from "react";
import { Navigate, useNavigate } from "react-router";
import Cookies from "js-cookie";

const HomeRoute = () => {
  const navigate = useNavigate();

  if (!Cookies.get("jwt")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-gray-200 p-5 min-h-screen">
      <h1 className="text-5xl text-center mb-12">Trivia !</h1>

      <div className="bg-white p-3">
        <h2 className="text-3xl pb-5">Choose a category and start the test</h2>
        <ul className="[&>li]:mb-3 [&>li]:text-xl [&>li:hover]:underline [&>li]:cursor-pointer [&>li]:w-fit">
          <li
            className="bg-green-700 p-1 text-white rounded-sm"
            onClick={() =>
              navigate("/exam", {
                state: { category: "Science & Nature", category_id: "17" },
              })
            }
          >
            Science & Nature
          </li>
          <li
            className="bg-sky-700 p-1 text-white rounded-sm"
            onClick={() =>
              navigate("/exam", {
                state: { category: "Geography", category_id: "22" },
              })
            }
          >
            Geography
          </li>
          <li
            className="bg-blue-700 p-1 text-white rounded-sm"
            onClick={() =>
              navigate("/exam", {
                state: { category: "History", category_id: "23" },
              })
            }
          >
            History
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeRoute;
