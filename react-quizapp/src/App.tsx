import { useState, useEffect } from 'react'
import './App.css'
import api from './api.js';

function App() {
  const [questions, setQuestions] = useState([]);   // the whole array from the API
  const [currentIndex, setCurrentIndex] = useState(0); // which one I'm showing
  const [answers, setAnswers] = useState({});          // { questionId: chosenAnswer }
  const [score, setScore] = useState(null);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const body = {
        answers: Object.entries(answers).map(([key, value]) => ({
          question_id: Number(key),
          answer: value
        }))
      };
      api.post('/submissions', body)
        .then(response => setScore(response.data.score))
        .catch(error => console.error('Error submitting answers:', error));
    }
  };

  const handleRestart = () => {
    setScore(null);
    setCurrentIndex(0);
    setAnswers({});
  };

  useEffect(() => {
    api.get('/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // 1. Still loading
  if (questions.length === 0) {
    return (
      <div className="quiz-screen">
        <p className="loading">Loading questions…</p>
      </div>
    );
  }

  // 2. Finished — show the score
  if (score !== null) {
    return (
      <div className="quiz-screen">
        <div className="card results">
          <p className="results-eyebrow">All done</p>
          <p className="results-score"><span>{score}</span> / {questions.length}</p>
          <p className="results-message">
            {score === questions.length
              ? 'Perfect run — every answer landed.'
              : `Nice work — you got ${score} of ${questions.length}.`}
          </p>
          <button className="action" onClick={handleRestart}>Try again</button>
        </div>
      </div>
    );
  }

  // 3. The quiz — values derived from state on each render
  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const selected = answers[current.id];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-screen">
      <div className="card">
        <div className="progress">
          <div className="progress-meta">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h1 className="question">{current.question}</h1>

        <div className="answers">
          {current.answers.map((answer) => (
            <button
              key={answer}
              className={`answer ${selected === answer ? 'answer--selected' : ''}`}
              onClick={() =>
                setAnswers(prev => ({ ...prev, [current.id]: answer }))
              }
            >
              {answer}
            </button>
          ))}
        </div>

        <button className="action" onClick={handleNext} disabled={!selected}>
          {isLast ? 'Submit test' : 'Next question'}
        </button>
      </div>
    </div>
  );
}

export default App
