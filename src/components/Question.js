import Options from "./Options";

function Question({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        hasAnswer={hasAnswer}
      />
    </div>
  );
}

export default Question;
