import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '../../../utils/router'
import { emptyBook } from '../../../utils/books'
import { useAuth, useBooks } from '../../../context'
import BookForm from '../../../components/BookForm'
import BookDetails from '../../../components/BookDetails'
import Cards from '../../../components/Cards'
import CardsNavigation from '../../../components/CardsNavigation'
import './BooksSelected.css'

const BooksSelected = () => {
  const [data, setData] = React.useState(emptyBook())
  const [related, setRelated] = React.useState({
    books: [],
    length: 0,
    page: 1,
    maxPage: 1,
    perPage: 4,
  })
  const wrapRef = React.useRef(null)
  const query = useQuery()
  const editing = query.get('edit')
  const category = query.get('category')
  const { id } = useParams()
  const history = useHistory()
  const { fetchBook, searchBooks, updateBook } = useBooks()
  const { isAdmin } = useAuth()

  React.useEffect(() => {
    const cb = async () => setData(await fetchBook(id))
    cb()
  }, [id, fetchBook])

  React.useEffect(() => {
    const cb = async () => {
      if (data.authors.length > 0) {
        const response = await searchBooks(data.authors[0], related.page,
          related.perPage, true)
        setRelated(prev => ({
          ...prev,
          books: response.results,
          length: response.length,
          maxPage: Math.ceil(response.length / prev.perPage),
        }))
      }
    }
    cb()
  }, [data, related.page, related.perPage, searchBooks])

  React.useEffect(() => {
    wrapRef.current.classList.add('viewing')
  }, [])

  const handleSave = async data => {
    await updateBook(data)
    history.goBack()
    setData(await fetchBook(id))
  }

  const handleClose = () => {
    wrapRef.current.classList.remove('viewing')
    setTimeout(() => {
      let url = '/books'
      if (category) url += `?category=${category}`
      history.push(url)
    }, 510)
  }

  const handleNextPage = () => setRelated(prev => ({
    ...prev,
    page: prev.page + 1,
  }))

  const handlePrevPage = () => setRelated(prev => ({
    ...prev,
    page: prev.page - 1,
  }))

  const handleEdit = () => {
    let url = `/books/selected/${data.id}?edit=true`
    if (category) url += `&category=${category}`
    history.push(url)
  }

  return (
    <div className="books-selected" ref={wrapRef}>
      <div className="background" onClick={handleClose} />
      <div className="inner">
        {editing ? (
          <BookForm
            book={data}
            onSave={handleSave}
            onDiscard={() => history.goBack()}
          />
        ) : (
          <>
            <BookDetails book={data} />
            <div className="books-related">
              <h4>More from {data.authors[0]}</h4>
              <CardsNavigation
                userPage={related.page}
                userMaxPage={related.maxPage}
                userPerPage={related.perPage}
                showSearch={false}
                showPerPage={false}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
              <Cards data={related.books} />
            </div>
            {isAdmin() && (
              <div className="book-action">
                <button onClick={handleEdit}>Edit</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BooksSelected
