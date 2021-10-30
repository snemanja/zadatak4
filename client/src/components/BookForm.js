import React from 'react'
import Input from './form/Input'
import Select from './form/Select'
import Authors from './form/Authors'
import Checkbox from './form/Checkbox'
import { CATEGORIES } from '../utils/constants'
import './BookForm.css'

const BookForm = ({ book, onSave, onDiscard }) => {
  const [data, setData] = React.useState(book)

  const handleChange = e => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckChange = e => {
    const { name, checked } = e.target
    setData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleAddAuthor = name => {
    if (name === '') return

    setData(prev => ({
      ...prev,
      authors: prev.authors.concat([name])
    }))
  }

  const handleRemoveAuthor = name => {
    setData(prev => ({
      ...prev,
      authors: prev.authors.filter(a => a !== name)
    }))
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    onSave(data)
  }

  return (
    <form
      className="book-form"
      onSubmit={handleFormSubmit}
    >
      <Input
        label="Title"
        name="title"
        value={data.title}
        onChange={handleChange}
      />
      <Select
        label="Genre"
        name="genre"
        value={data.genre}
        onChange={handleChange}
        options={CATEGORIES.map(cat => ({
          value: cat,
          label: cat
        }))}
      />
      <Input
        label="Pages"
        name="pages"
        type="number"
        value={data.pages}
        onChange={handleChange}
      />
      <Input
        label="Publish Date"
        name="publishDate"
        value={data.publishDate}
        onChange={handleChange}
      />
      <Input
        label="ISBN"
        name="isbn"
        value={data.isbn}
        onChange={handleChange}
      />
      <Authors
        label="Authors"
        name="authors"
        value={data.authors}
        onAdd={handleAddAuthor}
        onRemove={handleRemoveAuthor}
      />
      <Input
        label="Rating"
        name="rating"
        type="number"
        value={data.rating}
        onChange={handleChange}
        props={{
          step: 'any',
          min: 1,
          max: 5
        }}
      />
      <Checkbox
        label="Available?"
        name="available"
        value={data.available}
        onChange={handleCheckChange}
      />
      <div className="input action">
        <Input
          type="submit"
          value="Save"
        />
        <span onClick={onDiscard}>Discard</span>
      </div>
    </form>
  )
}

export default BookForm
