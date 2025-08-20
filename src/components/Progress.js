function Progress({ index, numQuestions, points, totalPoints, answer }) {

  return (
    <header className="progress">
      <progress min="0" max={numQuestions} value={index + Number(answer !== null)} />
      <p>Question {`${index + 1}/${numQuestions}`}</p>
      <p>{`${points}/${totalPoints}`} points</p>
    </header>
  );
}

export default Progress;
