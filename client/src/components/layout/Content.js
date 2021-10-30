import React from 'react'
import { useBooks } from '../../context'

const Content = ({ children }) => {
  const { adding, editing, error, clearError } = useBooks()

  return (
    <div className="content">
      {error && (!adding && !editing) && (
        <div className="error">{error}
          <button onClick={clearError}>x</button>
        </div>
      )}
      {children}
    </div>
  )
}

export default Content
