import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ReportPage() {
  const questions = useSelector((state) => state.questions);
  const attemptedQuestions = useSelector((state) => state.attemptedQuestions);

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correct_answer === attemptedQuestions[index]) {
        score++;
      }
    });
    return score;
  };

  const userScore = calculateScore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Quiz Report</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Score: {userScore}/{questions.length}</h2>
          <div>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="mb-2"><strong>Question {index + 1}:</strong></p>
                <div className="mb-2">Question: {question.question}</div>
                <div className="flex justify-between">
                  <p className="w-1/2">Your Answer: {attemptedQuestions[index]}</p>
                  <p className="w-1/2">Correct Answer: {question.correct_answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
