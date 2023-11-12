"use client";

import Quiz from "@/components/Quiz";
import StartQuiz from "@/components/StartQuiz";
import { useEffect, useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [maxQuestionNumber, setMaxQuestionNumber] = useState();
  const [formData, setFormData] = useState({
    category: 0,
    difficulty: "easy",
    numberOfQuestions: 5,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.numberOfQuestions < 0) {
      return;
    }
    toggleIsStarted();
  };

  const toggleIsStarted = () => {
    setIsStarted((prevState) => !prevState);
  };

  useEffect(() => {
    if (formData.category === 0) {
      setMaxQuestionNumber({
        easy: 999,
        medium: 999,
        hard: 999,
      });
    } else {
      fetch(`https://opentdb.com/api_count.php?category=${formData.category}`)
        .then((response) => response.json())
        .then((data) => {
          const {
            total_easy_question_count,
            total_medium_question_count,
            total_hard_question_count,
          } = data.category_question_count;
          setMaxQuestionNumber({
            easy: total_easy_question_count,
            medium: total_medium_question_count,
            hard: total_hard_question_count,
          });
        });
    }
  }, [formData.category]);

  return (
    <main>
      {(!isStarted && (
        <StartQuiz
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      )) || (
        <Quiz
          toggleIsStarted={toggleIsStarted}
          formData={formData}
          maxQuestionNumber={maxQuestionNumber[formData.difficulty]}
        />
      )}
    </main>
  );
}
