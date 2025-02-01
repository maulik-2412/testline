import { useEffect } from "react"

const Timer = ({ timeRemaining, setTimeRemaining, endQuiz }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          endQuiz()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [setTimeRemaining, endQuiz])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="timer">
      Time remaining: {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  )
}

export default Timer

