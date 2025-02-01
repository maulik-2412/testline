//results summary 

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const ResultsSummary = () => {
  const location = useLocation()
  const { userAnswers, score, quizData } = location.state

  //get all correctAnswers
  const correctAnswers = Object.values(userAnswers).filter(
    (answer, index) => answer.is_correct
  ).length

  //get all incorrect answers
  const incorrectAnswers = Object.values(userAnswers).filter(
    (answer, index) => !answer.is_correct ).length

  const chartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ["#4CAF50", "#FF5252"],
        hoverBackgroundColor: ["#45a049", "#ff1744"],
      },
    ],
  }

  return (
    <div className="results-summary">
      <h2>Quiz Results</h2>
      <p>Total Score: {score} points</p>
      <div className="chart-container">
        <Pie data={chartData} />
      </div>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>

      <h3>Question Review</h3>
      {quizData.questions.map((question, index) => (
        <div key={question.id} className="question-review">
          <h4>
            Question {index + 1}: {question.description}
          </h4>
          
          <p>Your Answer: {userAnswers?.[index]?.description || "No Answer Given"}</p>
          <p>Correct Answer: {question.options.find(option => option.is_correct)?.description || "Not Available"}</p>
          <p>Explanation: {question.detailed_solution || "Loading..."}</p>
        </div>
      ))}
    </div>
  )
}

export default ResultsSummary

