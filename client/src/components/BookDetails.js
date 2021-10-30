import React from 'react'

const BookDetails = ({ book }) => {
  return (
    <div className="book-details">
      <div>
        <p><b>Title</b></p>
        <p>{book.title}</p>
      </div>
      <div>
        <p><b>Genre</b></p>
        <p>{book.genre}</p>
      </div>
      <div>
        <p><b>Pages</b></p>
        <p>{book.pages}</p>
      </div>
      <div>
        <p><b>Publish Date</b></p>
        <p>{book.publishDate}</p>
      </div>
      <div>
        <p><b>ISBN</b></p>
        <p>{book.isbn}</p>
      </div>
      <div>
        <p><b>Authors</b></p>
        <p>{book.authors.join(', ')}</p>
      </div>
      <div>
        <p><b>Rating</b></p>
        <p>{parseFloat(book.rating).toFixed(2)}</p>
      </div>
      <div>
        <p><b>Available?</b></p>
        <p>{book.available ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}

export default BookDetails
