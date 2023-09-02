import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './screens/StartPage';
import QuizPage from './screens/QuizPage';
import ReportPage from './screens/ReportPage';
import Timer from './components/Timer'; // Import the Timer component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/quiz"
            element={
              <>
                <Timer /> {/* Render the Timer component */}
                <QuizPage />
              </>
            }
          />
          <Route path="/report" element={<ReportPage  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
