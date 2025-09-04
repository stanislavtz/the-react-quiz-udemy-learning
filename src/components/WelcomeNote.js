import { useQuiz } from "../contexts/QuizContext";

function WelcomeNote() {
  const { questions, startQuiz } = useQuiz();

  function handleStartQuiz() {
    startQuiz();
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStartQuiz}>
        Let's start!
      </button>
    </div>
  );
}

export default WelcomeNote;
