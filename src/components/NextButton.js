import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { answer, index, questions, dispatch } = useQuiz();
  if (answer === null) return null;

  const numQuestions = questions.length;
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "getNextQuestion" })}
    >
      NEXT
    </button>
  );
}

export default NextButton;
