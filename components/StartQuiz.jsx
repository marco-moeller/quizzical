import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const StartQuiz = (props) => {
  const difficulties = ["easy", "medium", "hard"];

  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    props.setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  return (
    <section>
      <h1>Quizzical</h1>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="numberOfQuestions">Number of Questions</label>
        <input
          type="number"
          name="numberOfQuestions"
          id="numberOfQuestions"
          value={props.formData.numberOfQuestions}
          onChange={handleChange}
          min="1"
          max="50"
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={props.formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={nanoid()} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          value={props.formData.difficulty}
          onChange={handleChange}
        >
          {difficulties.map((difficulty) => (
            <option key={nanoid()} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
        <button>Start Quiz</button>
      </form>
    </section>
  );
};

export default StartQuiz;
