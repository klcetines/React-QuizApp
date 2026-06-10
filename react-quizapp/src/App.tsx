import { useState, useEffect } from 'react'
import './App.css'
import api from './api.js';

function App() {
  const [questions, setQuestions] = useState([]);   // the whole array from the API
  const [currentIndex, setCurrentIndex] = useState(0); // which one I'm showing
  const [answers, setAnswers] = useState({});

  const increaseQuestionIndex = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else{
      const body = {
        answers: Object.entries(answers).map(([key, value]) => ({
          question_id: Number(key),
          answer: value
        }))
      };
      api.post('/submissions', body)
        .then(response => {
          alert(`Your score is: ${response.data.score}`);
        })
        .catch(error => {
          console.error('Error submitting answers:', error);
        });
    }
  };

  useEffect(() => {
    api.get('/questions')
        .then(response => {
          setQuestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
  }, []);
  if (questions.length === 0) {
    return <p>Loading...</p>;
  }
  else{
    return (
    <>
      <section id="quiz">
        <div className="hero-content">
          <h1>Welcome to the Ultimate Quiz App!</h1>
          
          <h2>{questions[currentIndex].question}</h2>
          
          <div>
            <select
              value={answers[questions[currentIndex].id] || ''}
              onChange={(e) =>
                setAnswers(prev => ({ ...prev, [questions[currentIndex].id]: e.target.value }))
              }
            >
              <option value="" disabled>Select an answer</option>
              <option value={questions[currentIndex].answers[0]}>{questions[currentIndex].answers[0]}</option>
              <option value={questions[currentIndex].answers[1]}>{questions[currentIndex].answers[1]}</option>
              <option value={questions[currentIndex].answers[2]}>{questions[currentIndex].answers[2]}</option>
            </select>
          </div>
          
          <button onClick={increaseQuestionIndex}>{currentIndex < questions.length-1 ? "Next Question" : "Submit test" }</button>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
  }
}


export default App
