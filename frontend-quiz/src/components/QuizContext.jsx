//context for fetching quiz data from api

import { useState,createContext,useEffect,useContext } from "react";
import axios from "axios";
const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_PROXY_URL}`);
        setQuizData(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching quiz data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []); 

  const updateQuizData = (data) => {
    setQuizData(data);
  };

  return (
    <QuizContext.Provider value={{ quizData, loading, error, updateQuizData }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);