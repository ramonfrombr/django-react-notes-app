import React from "react";

interface ResultProps {
  result: IResult;
}

const Result = ({ result }: ResultProps) => {
  return (
    <div
      key={result.question_id}
      className={`${
        result.result_correct ? "bg-green-500" : "bg-red-500"
      } text-white p-2 mb-5 rounded border`}
    >
      <h3 className="text-2xl mb-3">{result.question}</h3>
      {result.result_correct ? (
        <div>
          <p>Correct Answer: {result.correct_option}</p>
        </div>
      ) : (
        <>
          <p>Correct Answer: {result.correct_option}</p>
          <p>Your Answer: {result.user_choice}</p>
        </>
      )}
    </div>
  );
};

export default Result;
