import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuiz();
  const percentages = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You scored {points} from {totalPoints} points - (
        {percentages.toFixed(2)} %)
      </p>
      <p className="highscore">(High score: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
