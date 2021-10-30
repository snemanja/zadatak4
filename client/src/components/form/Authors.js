import React, { useState } from 'react'

const Authors = ({
  label,
  name,
  onAdd = author => null,
  onRemove = author => null,
  value = [],
  className = '',
}) => {
  const [author, setAuthor] = useState('')

  React.useEffect(() => setAuthor(''), [value])

  const handleAdd = () => {
    onAdd(author)
  }

  return (
    <div className={`input ${className}`}>
      <label htmlFor={name}>
        <label htmlFor={name}>{label}</label>
        <span className="preview">
          {value.map(v => <span key={v} onClick={() => onRemove(v)}>{v}</span>)}
        </span>
        <span className="control">
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <span
            className="add"
            onClick={handleAdd}
          >
            +
          </span>
        </span>
      </label>
    </div>
  )
}

export default Authors
