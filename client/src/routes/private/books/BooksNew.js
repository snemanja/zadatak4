import React from 'react'
import { useHistory } from 'react-router-dom'
import { useBooks } from '../../../context'
import { useQuery } from '../../../utils/router'
import BookForm from '../../../components/BookForm'
import { emptyBook } from '../../../utils/books'
import './BooksNew.css'

const NewBook = () => {
  const { addBook, setPage } = useBooks()
  const history = useHistory()
  const wrapRef = React.useRef(null)
  const query = useQuery()
  const category = query.get('category')

  React.useEffect(() => {
    wrapRef.current.classList.add('viewing')
  }, [])

  const handleAdd = async data => {
    await addBook(data)
    setPage(1)
    history.push('/books')
  }

  const handleClose = () => {
    wrapRef.current.classList.remove('viewing')
    setTimeout(() => {
      let url = '/books'
      if (category) url += `?category=${category}`
      history.push(url)
    }, 510)
  }

  const handleDiscard = () => history.goBack()

  return (
    <div className="books-new" ref={wrapRef}>
      <div className="background" onClick={handleClose} />
      <div className="inner">
        <BookForm
          book={emptyBook()}
          onSave={handleAdd}
          onDiscard={handleDiscard}
        />
      </div>
    </div>
  )
}

export default NewBook
