function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;

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
