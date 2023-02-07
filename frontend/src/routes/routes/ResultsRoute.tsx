import React from "react";
import { useLocation, useNavigate } from "react-router";
import TriviaResult from "../../components/TriviaResult";
import TriviaResultGrade from "../../components/TriviaResultGrade";

interface propState {
  results: ITriviaResult[];
  category: string;
}

const ResultsRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let { results, category } = location.state as propState;

  return (
    <div className="flex justify-center">
      <div className="p-5 sm:w-[600px]">
        <h1 className="text-2xl mb-5">Results for "{category}" trivia</h1>
        {results &&
          results.map((result) => (
            <TriviaResult key={result.question} result={result} />
          ))}
        <TriviaResultGrade results={results} />

        <button
          className="bg-blue-500 text-white font-bold p-2 mt-5"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultsRoute;
