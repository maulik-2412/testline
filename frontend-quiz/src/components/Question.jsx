
/* each question design */

const Question = ({ question, onAnswer, userAnswer }) => {
  
  /* question is each question, onAnswer is function to store user answers, userAnswer is 
  answer by user for current question */
  return (
    <div className="question">
      <h2>{question.description}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)} className={userAnswer === option ? "selected" : ""}>
            {option.description}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question


  
  