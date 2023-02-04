import React, { useState } from "react";

interface QuestionProps {
  questionNumber: number;
  question: IQuestion;
  setChoices: React.Dispatch<React.SetStateAction<IChoice[]>>;
}

const Question = ({ questionNumber, question, setChoices }: QuestionProps) => {
  const options: string[] = [
    question.correct_option,
    question.incorrect_option1,
    question.incorrect_option2,
    question.incorrect_option3,
    question.incorrect_option4,
  ];

  const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoices((currrentChoices) => {
      let index = currrentChoices.findIndex(
        (q) => q.question_id === question.id
      );

      if (index < 0) {
        return [
          ...currrentChoices,
          { question_id: question.id, choice: e.target.value },
        ];
      } else {
        let newChoices = currrentChoices;
        newChoices[index] = {
          question_id: question.id,
          choice: e.target.value,
        };
        return [...newChoices];
      }
    });
    console.log("question id: " + question.id + ", choice: " + e.target.value);
  };

  return (
    <div className="border rounded flex flex-col items-start p-2 mb-5 bg-slate-100">
      <h2 className="text-2xl my-2">
        {questionNumber + 1}. {question.question}
      </h2>
      <div className="bg-white w-full flex flex-col p-1 [&>label]:cursor-pointer [&>label:hover]:bg-slate-200 [&>label]:ease-in [&>label]:duration-150">
        {options.map((option, idx) => (
          <label
            className="p-2"
            key={idx}
            htmlFor={`option_${idx}_question_${question.id}`}
          >
            <input
              onChange={(e) => handleChoice(e)}
              type="radio"
              name={`option_question_${question.id}`}
              id={`option_${idx}_question_${question.id}`}
              value={option}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
