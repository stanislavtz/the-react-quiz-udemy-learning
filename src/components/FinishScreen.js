function FinishScreen({ points, totalPoints, highScore, dispatch, questions }) {
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
