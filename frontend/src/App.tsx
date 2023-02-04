import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Question from "./components/Question";
import Result from "./components/Result";
import ResultGrade from "./components/ResultGrade";

function App() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [choices, setChoices] = useState<IChoice[]>([]);
  const [results, setResults] = useState<IResult[]>();
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useLayoutEffect(() => {
    getQuestions();
  }, []);

  useLayoutEffect(() => {
    let r: IResult[] = questions.map((question) => {
      return {
        question_id: question.id,
        question: question.question,
        user_choice: null,
        correct_option: question.correct_option,
        result_correct: false,
      };
    });

    setResults(r);

    let c: IChoice[] = questions.map((question) => {
      return { question_id: question.id, choice: null };
    });

    setChoices(c);
  }, [questions]);

  const getQuestions = () => {
    axios
      .get("http://127.0.0.1:8000/questions/")
      .then((response: any) => setQuestions(response.data));
  };

  const handleSaveChoices = () => {
    let r: IResult[] = choices.map((choice: IChoice) => {
      let question = questions.find(
        (q) => q.id === choice.question_id
      ) as IQuestion;

      if (choice.choice === question.correct_option) {
        return {
          question_id: question.id,
          question: question.question,
          user_choice: choice.choice,
          correct_option: question.correct_option,
          result_correct: true,
        };
      } else {
        return {
          question_id: question!.id,
          question: question.question,
          user_choice: choice.choice,
          correct_option: question!.correct_option,
          result_correct: false,
        };
      }
    });
    setResults(r);
    setShowResults(true);
  };

  return (
    <div className="App">
      {showResults ? (
        <div className="p-5">
          <h1 className="text-2xl mb-5">Results</h1>
          {results &&
            results.map((result) => (
              <Result key={result.question_id} result={result} />
            ))}
          <ResultGrade results={results} questions={questions} />
        </div>
      ) : (
        <div className="p-5">
          <h1 className="text-2xl mb-5">Questions</h1>
          <div className="flex items-center justify-center border">
            <button
              disabled={currentQuestionIndex !== 0 ? false : true}
              className={`bg-gray-500 p-1 text-white ${
                currentQuestionIndex !== 0 ? "visible" : " invisible"
              }`}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            >
              Previous Question
            </button>
            <div className="w-[600px] mx-5">
              <h3 className="mb-3">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              {questions?.map((question, idx) => (
                <Question
                  currentQuestionIndex={currentQuestionIndex}
                  questionNumber={idx}
                  key={question.id}
                  question={question}
                  setChoices={setChoices}
                />
              ))}
            </div>

            <button
              disabled={
                currentQuestionIndex !== questions.length - 1 ? false : true
              }
              className={`bg-gray-500 p-1 text-white ${
                currentQuestionIndex !== questions.length - 1
                  ? "visible"
                  : " invisible"
              }`}
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            >
              Next Question
            </button>
          </div>

          <button
            className="bg-blue-500 text-white font-bold p-3"
            onClick={handleSaveChoices}
          >
            Save Options
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
