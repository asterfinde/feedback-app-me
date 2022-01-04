import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import Header from "./components/Header";

import FeedbackData from "./data/FeedbackData";

import FeedbackForm from "./components/FeedbackForm";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackList from "./components/FeedbackList";

// import AboutIconLink from './components/AboutIconLink'
import AboutPage from "./pages/AboutPage";

const App = () => {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Router>
        <Header />

        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    deleteFeedback={deleteFeedback}
                  />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;