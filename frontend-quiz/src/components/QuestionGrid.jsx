//question grid 
const QuestionGrid = ({ totalQuestions, currentQuestion, answeredQuestions, flaggedQuestions, onQuestionClick }) => {
  //totalQuestions is total no. of questions
  //currentQuuestion is the current Question which is active
  //answeredQuestions is collection of all questions answered
  //flaggedQuestions is collection of all flagged questions
  //OnQuestionClick is function for hadnling navigation when clicking a question box in grid
  
  return (
    <div className="question-grid-container">
      <h3>Questions</h3>
      <div className="question-grid">
        {[...Array(totalQuestions)].map((_, index) => (
          <button
            key={index}
            className={`grid-item 
              ${index === currentQuestion ? "current" : ""} 
              ${index in answeredQuestions ? "answered" : ""} 
              ${flaggedQuestions.includes(index) ? "flagged" : ""}`}
            onClick={() => onQuestionClick(index)}
            data-question={`Question ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionGrid


  
  