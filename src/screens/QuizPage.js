import React, { useEffect } from "react";
import axios from "axios";

import QuestionOverview from "../components/QuizOverview";
import Question from "../components/Question";
import { useDispatch, useSelector } from "react-redux";

function QuizPage() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const visitedQuestions = useSelector((state) => state.visitedQuestions);
  const attemptedQuestions = useSelector((state) => state.attemptedQuestions);
  const currentQuestion = useSelector((state) => state.currentQuestionIndex);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    let isMounted = true; // Add this variable to track component mount status

    async function fetchQuestions() {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=15"
        );

        if (isMounted) { // Check if the component is still mounted before dispatching
          dispatch({ type: "SET_QUESTIONS", payload: response.data.results });
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    }

    fetchQuestions();

    return () => {
      isMounted = false; // Set isMounted to false when unmounting
    };
  }, [dispatch]);

  const handleQuestionChange = (newIndex) => {
    // Set the current question as visited
    const updatedVisitedQuestions = [...visitedQuestions];
    updatedVisitedQuestions[currentQuestion] = true;
    dispatch({
      type: "SET_VISITED_QUESTIONS",
      payload: updatedVisitedQuestions,
    });

    // Update the current question index
    dispatch({ type: "SET_CURRENT_QUESTION", payload: newIndex });
  };

  const handleQuestionSubmit = (selectedAnswer) => {
    // Create a copy of the attemptedQuestions array
    const updatedAttemptedQuestions = [...attemptedQuestions];
    // Set the current question as attempted
    updatedAttemptedQuestions[currentQuestion] = true;

    // Move to the next question or handle the end of the quiz
    if (currentQuestion < questions.length - 1) {
      handleQuestionChange(currentQuestion + 1);
    } else {
      // Handle end of the quiz here
    }
  };

  const handleQuestionSelect = (questionIndex) => {
    dispatch({ type: "SET_CURRENT_QUESTION", payload: questionIndex });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Quiz Page</h1>

        <div className="flex">
          <div className="w-1/4 mr-4">
            <QuestionOverview
              questions={questions}
              currentQuestion={currentQuestion}
              visitedQuestions={visitedQuestions}
              attemptedQuestions={attemptedQuestions}
              onQuestionChange={handleQuestionChange} 
              onQuestionSelect={handleQuestionSelect} // This is where you pass the function
            />
          </div>
          <div className="w-3/4 pr-4">
            {loading ? (
              <p>Loading questions...</p>
            ) : (
              <Question
                question={questions[currentQuestion]}
                questionIndex={currentQuestion}
                totalQuestions={questions.length}
                onQuestionSubmit={handleQuestionSubmit}
                onQuestionChange={handleQuestionChange} // Pass the onQuestionChange function
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
