import React from 'react'

const Checkbox = ({
  name,
  value,
  label = false,
  onChange = e => null,
  className = '',
  props = {}
}) => {
  return (
    <div className={`input ${className}`}>
      <label htmlFor={name}>
        {label && label}
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={value}
          onChange={onChange}
          {...props}
        />
      </label>
    </div>
  )
}

export default Checkbox
