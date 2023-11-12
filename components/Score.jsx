import React from "react";

const Score = ({ score, numberOfQuestions }) => {
  return (
    <h2 className="score">
      Your score is {score}/{numberOfQuestions}
    </h2>
  );
};

export default Score;
