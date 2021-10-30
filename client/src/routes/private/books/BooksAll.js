import React from 'react'
import { changeTitle } from '../../../utils/doc'
import { useQuery } from '../../../utils/router'
import { useBooks } from '../../../context'
import Cards from '../../../components/Cards'
import CardsNavigation from '../../../components/CardsNavigation'

const BooksAll = () => {
  const { fetchBooks, searchBooks, books, page, perPage, search } = useBooks()
  const category = useQuery().get('category')

  React.useEffect(() => {
    if (category !== null) {
      changeTitle(`Browsing '${category}'`)
      searchBooks(category)
    } else {
      if (search === '') {
        changeTitle()
        fetchBooks()
      } else {
        changeTitle(`Searching for '${search}'`)
        searchBooks()
      }
    }
  }, [category, search, page, perPage, fetchBooks, searchBooks])

  return (
    <>
      <CardsNavigation showSearch={category === null} />
      <Cards data={books} />
    </>
  )
}

export default BooksAll
