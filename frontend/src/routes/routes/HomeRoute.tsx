import React from "react";
import { useNavigate } from "react-router";

const HomeRoute = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-200 p-5 min-h-screen">
      <h1 className="text-5xl text-center mb-12">Trivia !</h1>
      <h2 className="text-3xl pb-5">Choose a Category</h2>
      <ul className="[&>li]:mb-3 [&>li]:text-xl [&>li:hover]:underline [&>li]:cursor-pointer [&>li]:w-fit">
        <li
          onClick={() =>
            navigate("/exam", {
              state: { category: "Science & Nature", category_id: "17" },
            })
          }
        >
          Science & Nature
        </li>
        <li
          onClick={() =>
            navigate("/exam", {
              state: { category: "History", category_id: "23" },
            })
          }
        >
          History
        </li>
        <li
          onClick={() =>
            navigate("/exam", {
              state: { category: "Geography", category_id: "22" },
            })
          }
        >
          Geography
        </li>
      </ul>
    </div>
  );
};

export default HomeRoute;
