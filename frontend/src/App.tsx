import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Question from "./components/Question";

function App() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [choices, setChoices] = useState<IChoice[]>([]);
  const [results, setResults] = useState<IResult[]>();
  const [showResults, setShowResults] = useState(true);

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
            ))}
          <div className="bg-gray-300 w-fit p-3">
            <span className="text-xl">Results:</span>
            <span className="text-2xl ml-3">
              {results?.reduce(
                (accumulator, currentResult) =>
                  currentResult.result_correct
                    ? (accumulator += 1)
                    : accumulator,
                0
              )}
              /{questions.length}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <h1 className="text-2xl mb-5">Questions</h1>
          {questions?.map((question, idx) => (
            <Question
              questionNumber={idx}
              key={question.id}
              question={question}
              setChoices={setChoices}
            />
          ))}
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
