import { decode } from "html-entities";
import { nanoid } from "nanoid";

const Question = ({ question, revealAnswers, toggleMarked }) => {
  const getAnswerStyle = (answer) => {
    if (revealAnswers && answer.answer === question.correct_answer) {
      return "correct";
    }

    if (
      revealAnswers &&
      answer.isMarked &&
      answer.answer !== question.correct_answer
    ) {
      return "incorrect";
    }
    if (answer.isMarked) {
      return "marked";
    }
    return "unmarked";
  };

  return (
    <div className="question">
      <h2>{decode(question.question)}</h2>
      <div className="answers">
        {question.answers.map((answer) => {
          return (
            <h3
              className={"answer " + getAnswerStyle(answer)}
              key={nanoid()}
              onClick={() => toggleMarked(answer.id, question.id)}
            >
              {decode(answer.answer)}
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
