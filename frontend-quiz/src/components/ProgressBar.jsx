/* implement progress bar here */

const ProgressBar = ({ current, total }) => {
    const progress = (current / total) * 100 /* get current number of questions and total number of questions from 
                                                QuizContainer */
  
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
        <span>
          {current} / {total}
        </span>
      </div>
    )
  }
  
  export default ProgressBar
  
  