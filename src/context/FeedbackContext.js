import { v4 as uuidv4 } from "uuid";

import { createContext, useState } from "react";

const FeedbackContext = createContext(null);

const initialState = [
  {
    id: 1,
    text: "This item is feedback itme 1",
    rating: 10
  },
  {
    id: 2,
    text: "This item is feedback itme 2",
    rating: 9
  },
  {
    id: 3,
    text: "This item is feedback itme 3",
    rating: 8
  }
];

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(initialState);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Set item to be updated
  const editFeedback = (item) => {
    // console.log( item )
    setFeedbackEdit({ item, edit: true });
  };

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    // console.log(id, updItem)
    // console.log(id)
    // console.log(updItem)

    setFeedback(
      // overwrite the item with equal ID
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        editFeedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
