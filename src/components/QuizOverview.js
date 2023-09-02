import React from 'react';
import { useSelector } from 'react-redux';

function QuestionOverview({ questions, currentQuestion, onQuestionSelect, onQuestionChange }) {
  const visitedQuestions = useSelector((state) => state.visitedQuestions);
  const attemptedQuestions = useSelector((state) => state.attemptedQuestions);

  const handleQuestionButtonClick = (index) => {
    onQuestionSelect(index);
    onQuestionChange(index);
  };

  return (
    <div className="bg-gray-200 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Question Overview</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index} className="mb-2">
            <button
              className={`w-8 h-8 rounded-full mr-2 
                ${visitedQuestions[index] ? 'bg-blue-500' : 'bg-gray-300'} 
                ${attemptedQuestions[index] ? 'bg-green-500' : 'bg-blue-500'}
                ${currentQuestion === index ? 'border-2 border-red-500' : ''}`} 
              onClick={() => handleQuestionButtonClick(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionOverview;
