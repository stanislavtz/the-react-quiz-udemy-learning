import { useQuiz } from "../contexts/QuizContext";

function NextButton({ dispatch }) {
  const { answer, index, questions, getNextQuestion, finishQuiz } = useQuiz();
  if (answer === null) return null;

  const numQuestions = questions.length;
  if (index === numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={() => finishQuiz()}>
        Finish
      </button>
    );
  }

  return (
    <button className="btn btn-ui" onClick={() => getNextQuestion()}>
      NEXT
    </button>
  );
}

export default NextButton;
