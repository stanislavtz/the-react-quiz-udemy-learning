import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const {setAnswer, answer} = useQuiz();
  const hasAnswer = answer !== null;

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
          onClick={() => setAnswer(index)}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
