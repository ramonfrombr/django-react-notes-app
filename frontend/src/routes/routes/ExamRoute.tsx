import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import TriviaQuestion from "../../components/TriviaQuestion";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface propState {
  category: string;
  category_id: string;
}

const ExamRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [triviaQuestions, setTriviaQuestions] = useState<ITriviaQuestion[]>([]);
  const [triviaChoices, setTriviaChoices] = useState<ITriviaChoice[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  let { category, category_id } = location.state as propState;

  useLayoutEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category_id}&type=multiple`
      )
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        setTriviaQuestions(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [category_id]);

  useLayoutEffect(() => {
    let c: ITriviaChoice[] = triviaQuestions.map((question) => {
      return { question: question.question, choice: null };
    });

    setTriviaChoices(c);
  }, [triviaQuestions]);

  const calculateResults = () => {
    let r: ITriviaResult[] = triviaChoices.map((choice: ITriviaChoice) => {
      let question = triviaQuestions.find(
        (q) => q.question === choice.question
      ) as ITriviaQuestion;

      if (choice.choice === question.correct_answer) {
        return {
          question: question.question,
          user_choice: choice.choice,
          correct_option: question.correct_answer,
          result_correct: true,
        };
      } else {
        return {
          question: question.question,
          user_choice: choice.choice,
          correct_option: question!.correct_answer,
          result_correct: false,
        };
      }
    });

    navigate("/results", {
      state: { results: r, category: category },
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-24">{category} Questions</h1>
      <div>
        <div className="flex items-start justify-center border mb-5">
          <button
            disabled={currentQuestionIndex !== 0 ? false : true}
            className={`mt-1 bg-gray-400 p-1 text-white ${
              currentQuestionIndex !== 0 ? "visible" : " invisible"
            }`}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          >
            <FaArrowCircleLeft />
          </button>
          <div className="mx-5 w-[600px]">
            <h3 className="mb-5 text-xl sm:text-2xl">
              Question {currentQuestionIndex + 1} of {triviaQuestions.length}
            </h3>
            {triviaQuestions.map((question, idx) => (
              <TriviaQuestion
                key={idx}
                currentQuestionIndex={currentQuestionIndex}
                questionNumber={idx}
                question={question}
                setChoices={setTriviaChoices}
              />
            ))}
          </div>
          <button
            disabled={
              currentQuestionIndex !== triviaQuestions.length - 1 ? false : true
            }
            className={`mt-1 bg-gray-400 p-1 text-white ${
              currentQuestionIndex !== triviaQuestions.length - 1
                ? "visible"
                : " invisible"
            }`}
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          >
            <FaArrowCircleRight />
          </button>
        </div>

        {currentQuestionIndex === triviaQuestions.length - 1 && (
          <button
            className="bg-blue-500 text-white font-bold p-3"
            onClick={calculateResults}
          >
            Calculate Results
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamRoute;
