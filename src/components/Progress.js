import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { questions, index, points, totalPoints, answer } = useQuiz();

  const numQuestions = questions.length;

  return (
    <header className="progress">
      <progress
        min="0"
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <p>Question {`${index + 1}/${numQuestions}`}</p>
      <p>{`${points}/${totalPoints}`} points</p>
    </header>
  );
}

export default Progress;
