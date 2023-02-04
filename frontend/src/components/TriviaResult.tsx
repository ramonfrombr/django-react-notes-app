import React from "react";
import { renderHTML } from "../utils";

interface ResultProps {
  result: ITriviaResult;
}

const TriviaResult = ({ result }: ResultProps) => {
  return (
    <div
      key={result.question}
      className={`${
        result.result_correct ? "bg-green-500" : "bg-red-500"
      } text-white p-2 mb-5 rounded border`}
    >
      <h3 className="text-xl mb-2 sm:text-2xl sm:mb-3 ">
        {renderHTML(result.question)}
      </h3>
      <p>Correct Answer: {result.correct_option}</p>
      {!result.result_correct && (
        <p className="mt-5">Your Answer: {result.user_choice}</p>
      )}
    </div>
  );
};

export default TriviaResult;
