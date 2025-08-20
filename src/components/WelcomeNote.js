function WelcomeNote({ questionsNumber, dispatch }) {
    function handleStartQuiz() {
        dispatch({type: "startQuiz"})
    }
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsNumber} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStartQuiz}>Let's start!</button>
    </div>
  );
}

export default WelcomeNote;
