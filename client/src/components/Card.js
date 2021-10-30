import React from 'react'
import { useAuth, useBooks } from '../context'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../utils/router'

const BookCard = ({ book }) => {
  const { isAdmin } = useAuth()
  const history = useHistory()
  const category = useQuery().get('category')
  const { removeBook, setPage, searchBooks, fetchBooks } = useBooks()
  const dateArr = book.publishDate.split('-')
  const year = dateArr[0]
  let rating = []
  for (let i = 0; i < Math.round(book.rating); i++) {
    rating.push(<span key={`star_${i}`}>☆</span>)
  }

  const handleSelect = () => {
    let url = `/books/selected/${book.id}`
    if (category) url += `?category=${category}`
    history.push(url)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove ${book.title}`)) {
      await removeBook(book.id)
      setPage(1)
      if (category !== null) {
        searchBooks(category)
      } else {
        fetchBooks()
      }
    }
  }

  return (
    <div className="card">
      <div className="content">
        <div className="title">
          <p className="book-title">{book.title}</p>
          <p className="book-authors">{book.authors.join(', ')}</p>
          <p className="book-year">{year} <small>{book.genre}</small></p>
        </div>
        <div className="footer">
          <div className="rating">{rating}</div>
          <div className="action">
            <button className="select" onClick={handleSelect}>View</button>
            {isAdmin() && <button className="remove" onClick={handleRemove}>🗑️</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard