import React from 'react'
import { useBooks } from '../context'
import Select from '../components/form/Select'
import Input from '../components/form/Input'
import './CardsNavigation.css'

const CardsNavigation = ({
  showPerPage = true,
  showSearch = true,
  userPage = false,
  userPerPage = false,
  userMaxPage = false,
  onNextPage = false,
  onPrevPage = false,
  onPerPage = false,
  onSearch = false
}) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const searchTimeout = React.useRef(null)

  const state = useBooks()

  const handleSearch = e => {
    const { value } = e.target
    setSearchTerm(value)
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      if (onSearch !== false) {
        onSearch(value)
      } else {
        state.setSearch(value)
      }
    }, 1000)
  }

  const clearSearch = () => {
    setSearchTerm('')
    if (onSearch !== false) {
      onSearch('')
    } else {
      state.setSearch('')
    }
  }

  const handleNextPage = () => {
    if (onNextPage !== false) {
      onNextPage()
    } else {
      state.nextPage()
    }
  }

  const handlePrevPage = () => {
    if (onPrevPage !== false) {
      onPrevPage()
    } else {
      state.prevPage()
    }
  }

  const handlePerPage = e => {
    const { value } = e.target
    if (onPerPage !== false) {
      onPerPage(value)
    } else {
      state.setPerPage(value)
    }
  }

  const page = (userPage !== false) ? userPage : state.page

  const maxPage = (userMaxPage !== false) ? userMaxPage : state.maxPage

  const perPage = (userPerPage !== false) ? userPerPage : state.perPage

  return (
    <div className="cards-navigation">
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
          className="prev"
        >
          Prev
        </button>
        Page: {page} from {maxPage}
        <button
          disabled={page === maxPage}
          onClick={handleNextPage}
          className="next"
        >
          Next
        </button>
      </div>
      {showPerPage && (
        <Select
          name="per_page"
          value={perPage}
          onChange={handlePerPage}
          className="per-page"
          options={[
            { label: 10, value: 10 },
            { label: 25, value: 25 },
            { label: 50, value: 50 },
            { label: 100, value: 100 },
          ]}
        />
      )}
      {showSearch && (
        <div className="search-wrap">
          <Input
            value={searchTerm}
            onChange={handleSearch}
            props={{ placeholder: 'Search...' }}
          />
          <span onClick={clearSearch}>Clear</span>
        </div>
      )}
    </div>
  )
}

export default CardsNavigation
