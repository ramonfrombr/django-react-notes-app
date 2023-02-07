import React, { useState } from "react";

import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { renderHTML } from "../utils";

interface ResultsHistoryItemProps {
  result: ITriviaExamResult;
}

const ResultsHistoryItem = ({ result }: ResultsHistoryItemProps) => {
  const [showQuestions, setShowQuestions] = useState(false);

  const calculateResult = (result: ITriviaExamResult) => {
    return result.questions.reduce(
      (accumulator, currentQuestion) =>
        currentQuestion.result_correct ? accumulator + 1 : accumulator,
      0
    );
  };
  return (
    <div className="p-2 border mb-2 bg-gray-100">
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setShowQuestions((prev) => !prev)}
      >
        <div>
          <h2 className="text-xl mb-2">Category: {result.category}</h2>
          <h3 className="mb-1">
            Date: {new Date(result.date).toLocaleString()}
          </h3>
          <div className="bg-gray-500 w-fit rounded p-1 text-white font-bold">
            Score: {calculateResult(result)}/{result.questions.length}
          </div>
        </div>

        {showQuestions ? (
          <IoMdArrowDropupCircle size={24} color={"gray"} />
        ) : (
          <IoMdArrowDropdownCircle size={24} color={"gray"} />
        )}
      </div>

      {showQuestions && (
        <div className="border bg-white p-2 mt-4">
          {result.questions.map((question, idx) => (
            <div
              className={`${
                question.result_correct ? "bg-green-300" : "bg-red-400"
              } mb-2 p-1`}
              key={idx}
            >
              <h4>{renderHTML(question.question)}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsHistoryItem;
