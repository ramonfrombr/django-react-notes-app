interface IQuestion {
  id: number;
  question: string;
  correct_option: string;
  incorrect_option1: string;
  incorrect_option2: string;
  incorrect_option3: string;
  incorrect_option4: string;
  topic: string;
}

interface IChoice {
  question_id: number;
  choice: string | null;
}

interface IResult {
  question_id: number;
  question: string;
  user_choice: string | null;
  correct_option: string;
  result_correct: boolean;
}
