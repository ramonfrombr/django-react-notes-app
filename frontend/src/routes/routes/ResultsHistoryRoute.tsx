import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ResultsHistoryItem from "../../components/ResultsHistoryItem";

const ResultsHistoryRoute = () => {
  const [results, setResults] = useState<ITriviaExamResult[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/trivia_exams_results", {
        withCredentials: true,
      })
      .then(function (response) {
        setResults(
          response.data.sort((a: ITriviaExamResult, b: ITriviaExamResult) =>
            a.date > b.date ? -1 : 1
          )
        );
      })
      .catch(function (error) {
        // handle error
        alert(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  if (!Cookies.get("jwt")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex justify-center">
      <div className="p-5 w-full sm:w-[600px]">
        <h1 className="my-5 text-3xl">Exam Results</h1>
        {results.map((result, idx) => (
          <ResultsHistoryItem key={idx} result={result} />
        ))}
      </div>
    </div>
  );
};

export default ResultsHistoryRoute;
