//quiz window


import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Question from "./Question"
import ProgressBar from "./ProgressBar"
import Timer from "./Timer"
import { useQuiz } from "./QuizContext"
import QuestionGrid from "./QuestionGrid"


const QuizContainer = () => {
  const { quizData, loading, error } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0); 
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const navigate = useNavigate()

  
  // set timer
  useEffect(() => {
    if (quizData?.duration) {
      setTimeRemaining(quizData.duration * 60); 
    }
  }, [quizData]);
  
  if (loading) {
    return <div>Loading quiz data...</div>;
  }

  if (error) {
    return <div>Error loading quiz data: {error}</div>;
  }

  // collect all answers
  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }))
  }

  // handle navigation which id done by grid box
  const handleNavigation = (index) => {
    setCurrentQuestionIndex(index)
  }

  // handle flags
  const handleFlag = () => {
    setFlaggedQuestions((prev) => {
      if (prev.includes(currentQuestionIndex)) {
        return prev.filter((i) => i !== currentQuestionIndex)
      } else {
        return [...prev, currentQuestionIndex]
      }
    })
  }

  // calculate final score and navigate to result
  const endQuiz = () => {
    const finalScore = calculateScore()
    navigate("/results", { state: { userAnswers, score:finalScore, quizData } })
  }
  const calculateScore = () => {
    let totalScore = 0
    Object.entries(userAnswers).forEach(([index, answer]) => {
      if (answer.is_correct === true) {
        totalScore += parseInt(quizData.correct_answer_marks) 
      } else {
        totalScore -= parseInt(quizData.negative_marks) 
      }
    })
    return totalScore
  }


  if (!quizData) return <div>Loading...</div>

  return (
    <div className="quiz-container">
      <ProgressBar current={currentQuestionIndex + 1} total={quizData.questions.length} />
      <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} endQuiz={endQuiz} />
      <div className="quiz-content">
        <div className="question-area">
          <Question
            question={quizData.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestionIndex]}
          />

          {/* navigation buttons */}
          <div className="question-actions">
            <button onClick={() => handleNavigation(Math.max(0, currentQuestionIndex - 1))}>Previous</button>
            <button onClick={handleFlag}>{flaggedQuestions.includes(currentQuestionIndex) ? "Unflag" : "Flag"}</button>
            {currentQuestionIndex === quizData.questions.length - 1 ? (
              <button onClick={endQuiz}>Finish Quiz</button>
            ) : (
              <button
                onClick={() => handleNavigation(Math.min(quizData.questions.length - 1, currentQuestionIndex + 1))}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <QuestionGrid
          totalQuestions={quizData.questions.length}
          currentQuestion={currentQuestionIndex}
          answeredQuestions={userAnswers}
          flaggedQuestions={flaggedQuestions}
          onQuestionClick={handleNavigation}
        />
      </div>
    </div>
  )
}

export default QuizContainer

