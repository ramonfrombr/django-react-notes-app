import React, { useMemo } from "react";
import { renderHTML } from "../utils";

interface TriviaQuestionProps {
  question: ITriviaQuestion;
  questionNumber: number;
  currentQuestionIndex: number;
  setChoices: React.Dispatch<React.SetStateAction<ITriviaChoice[]>>;
}

const TriviaQuestion = ({
  question,
  questionNumber,
  currentQuestionIndex,
  setChoices,
}: TriviaQuestionProps) => {
  /*
  const options: string[] = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];*/

  const options = useMemo(
    () => [question.correct_answer, ...question.incorrect_answers],
    [question]
  );

  const shuffledOptions = useMemo(() => {
    function shuffle(array: string[]) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }
    return shuffle(options);
  }, [options]);

  const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoices((currrentChoices) => {
      let index = currrentChoices.findIndex(
        (q) => q.question === question.question
      );

      if (index < 0) {
        return [
          ...currrentChoices,
          { question: question.question, choice: e.target.value },
        ];
      } else {
        let newChoices = currrentChoices;
        newChoices[index] = {
          question: question.question,
          choice: e.target.value,
        };
        return [...newChoices];
      }
    });
  };

  return (
    <div
      className={`border rounded flex flex-col items-start p-2 bg-slate-100 ${
        currentQuestionIndex === questionNumber ? "block" : "hidden"
      }`}
    >
      <h2 className="mb-4 sm:text-2xl">{renderHTML(question.question)}</h2>

      <div className="bg-white w-full flex flex-col p-1 [&>label]:cursor-pointer [&>label:hover]:bg-slate-200 [&>label]:ease-in [&>label]:duration-150">
        {shuffledOptions.map((option: string, idx: number) => (
          <label
            className="p-2 sm:text-xl"
            key={idx}
            htmlFor={`option_${idx}_question_${question.question}`}
          >
            <input
              onChange={(e) => handleChoice(e)}
              className="mr-2"
              type="radio"
              name={`option_question_${question.question}`}
              id={`option_${idx}_question_${question.question}`}
              value={option}
            />{" "}
            {renderHTML(option)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TriviaQuestion;
