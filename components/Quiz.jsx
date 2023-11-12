import React, { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import Score from "./Score";
import Loading from "./Loading";

const BASE_URL = "https://opentdb.com/api.php?";
const AMOUNT = "amount=";
const CATEGORY = "&category=";
const DIFFICULTY = "&difficulty="; //easy, medium, hard

const Quiz = ({ toggleIsStarted, formData, maxQuestionNumber }) => {
  const { difficulty, numberOfQuestions, category } = formData;

  const [questions, setQuestions] = useState([]);
  const [revealAnswers, setRevealAnsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMarked = (answerId, questionId) => {
    setQuestions((prevState) =>
      prevState.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id === answerId
                  ? { ...answer, isMarked: !answer.isMarked }
                  : { ...answer, isMarked: false }
              ),
            }
          : question
      )
    );
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) =>
      question.answers.forEach((answer) =>
        answer.answer === question.correct_answer && answer.isMarked
          ? score++
          : ""
      )
    );
    return score;
  };

  const restartGame = () => {
    toggleIsStarted();
  };

  useEffect(() => {
    const shuffleAnswers = (incorrectAnswers, correctAnswer) => {
      return [...incorrectAnswers, correctAnswer]
        .slice()
        .sort(() => Math.random() - 0.5);
    };

    const fetchQuestions = (numberOfQuestions) => {
      const questions =
        numberOfQuestions > maxQuestionNumber
          ? maxQuestionNumber
          : numberOfQuestions;
      fetch(
        BASE_URL +
          AMOUNT +
          questions +
          CATEGORY +
          category +
          DIFFICULTY +
          difficulty
      )
        .then((res) => res.json())
        .then((data) => {
          setQuestions(
            data.results.map((question) => ({
              ...question,
              id: nanoid(),
              answers: shuffleAnswers(
                question.incorrect_answers,
                question.correct_answer
              ).map((answer) => ({ answer, isMarked: false, id: nanoid() })),
            }))
          );
          setIsLoading(false);
        });
    };
    setIsLoading(true);
    fetchQuestions(numberOfQuestions);
  }, []);

  return (
    <>
      {isLoading && (
        <section>
          <Loading />
        </section>
      )}
      {!isLoading && (
        <section>
          {questions.map((question) => (
            <Question
              key={nanoid()}
              question={question}
              revealAnswers={revealAnswers}
              toggleMarked={toggleMarked}
            />
          ))}

          <button
            onClick={() =>
              revealAnswers ? restartGame() : setRevealAnsers(true)
            }
          >
            {revealAnswers ? "Play Again" : "Check Answers"}
          </button>
          {revealAnswers && (
            <Score
              score={calculateScore()}
              numberOfQuestions={questions.length}
            />
          )}
        </section>
      )}
    </>
  );
};

export default Quiz;
