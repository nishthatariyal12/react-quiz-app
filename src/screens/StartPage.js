import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function StartPage({ startQuiz }) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_EMAIL', payload: email });
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Welcome to the Quiz App!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Enter your email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartPage;
