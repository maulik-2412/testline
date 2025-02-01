import { Link } from "react-router-dom"
import { useQuiz } from "./QuizContext";




const HomePage = () => {
  
  
  const { quizData, loading, error } = useQuiz(); /* get quiz data */

  if (loading) {
    return <div>Loading quiz data...</div>;
  }

  if (error) {
    return <div>Error loading quiz data: {error}</div>;
  }
  

  return (
    <div className="home-page">
      <h1>{quizData.title}</h1>
      <h2>Topic: {quizData.topic}</h2>
      <div className="quiz-info">
        <p>Duration: {quizData.duration}</p>
        <p>Correct Answer: +{quizData.correct_answer_marks} marks</p>
        <p>Negative Marking: {quizData.negative_marks} marks</p>
        <p>Total Questions: {quizData.questions_count}</p>
      </div>
      <Link to="/quiz" className="start-quiz-btn">
        Start Quiz
      </Link>
    </div>
  )
}

export default HomePage

