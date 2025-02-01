import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import QuizContainer from "./components/QuizContainer"
import ResultsSummary from "./components/ResultsSummary"
import HomePage from "./components/HomePage"
import { QuizProvider } from "./components/QuizContext"
import "./App.css"

function App() {
  return (
    <QuizProvider> {/* context for api data */}
    <Router>
      <div className="App">
        <Routes>
          {/* home page */}
          <Route path="/" element={<HomePage  />} />  

          {/* quiz section */}
          <Route path="/quiz" element={<QuizContainer  />} />

          {/* result */}
          <Route path="/results" element={<ResultsSummary />} />  
        </Routes>
      </div>
    </Router>
    </QuizProvider>
  )
}

export default App

