import React from "react";

interface ResultsGradeProps {
  results: ITriviaResult[] | undefined;
}

const TriviaResultGrade = ({ results }: ResultsGradeProps) => {
  return (
    <div className="bg-gray-300 w-fit p-3">
      <span className="text-xl">Results:</span>
      <span className="text-2xl ml-3">
        {results?.reduce(
          (accumulator, currentResult) =>
            currentResult.result_correct ? (accumulator += 1) : accumulator,
          0
        )}
        /{results?.length}
      </span>
    </div>
  );
};

export default TriviaResultGrade;
