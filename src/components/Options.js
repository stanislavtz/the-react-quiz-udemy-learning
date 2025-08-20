function Options({ question, dispatch, answer, hasAnswer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } ${answer === index ? "answer" : ""}`}
          key={option}
          onClick={() => dispatch({ type: "setAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
