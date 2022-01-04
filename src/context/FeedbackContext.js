import { v4 as uuidv4 } from "uuid"

import { createContext, useState, useEffect } from "react"

const FeedbackContext = createContext( null )

const initialState = []

export const FeedbackProvider = ({ children }) => {
  const [ feedback, setFeedback ] = useState( initialState )
  const [ feedbackEdit, setFeedbackEdit ] = useState({ item: {}, edit: false })
  const [ isLoading, setIsLoading ] = useState( true )

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
    const data = await response.json()

    setFeedback( data )
    setIsLoading( false )
  }

  // Add feedback
  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4();
    setFeedback( [newFeedback, ...feedback] )
  }

  // Delete feedback
  const deleteFeedback = id => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback( feedback.filter( item => item.id !== id) )
    }
  }

  // Set item to be updated
  const editFeedback = item => {
    // console.log( item )
    setFeedbackEdit({ item, edit: true })
  }

  // Update feedback item
  const updateFeedback = ( id, updItem ) => {
    // console.log(id, updItem)
    // console.log(id)
    // console.log(updItem)

    setFeedback(
      // overwrite the item with equal ID
      feedback.map( item => (item.id === id ? { ...item, ...updItem } : item) )
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        
        addFeedback,
        editFeedback,
        updateFeedback,
        deleteFeedback,
      }}
    >
      { children }
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
