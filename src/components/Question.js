import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'; 

function Question({ question, questionIndex, totalQuestions, onQuestionChange, onQuestionSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
   const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    dispatch({
      type: "SET_ATTEMPTED_QUESTION",
      payload: { index: questionIndex, value: answer }, 
    });
  };

  const handleNextQuestion = () => {

    onQuestionSubmit(selectedAnswer);

    if (questionIndex < totalQuestions - 1) {
      
      onQuestionChange(questionIndex + 1); 
    } else {
      
      navigate('/report'); 
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Question {questionIndex + 1}</h2>
      <p className="mb-4">{question?.question}</p>
      <ul>
        {question?.incorrect_answers?.map((answer, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleAnswerSelect(answer)}
                className="mr-2 text-blue-500 focus:ring focus:border-blue-300"
              />
              {answer}
            </label>
          </li>
        ))}
        <li className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={question?.correct_answer}
              checked={selectedAnswer === question?.correct_answer}
              onChange={() => handleAnswerSelect(question?.correct_answer)}
              className="mr-2 text-blue-500 focus:ring focus:border-blue-300"
            />
            {question?.correct_answer}
          </label>
        </li>
      </ul>

      {questionIndex === totalQuestions - 1 && (
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      )}
      {questionIndex < totalQuestions - 1 && (
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default Question;
