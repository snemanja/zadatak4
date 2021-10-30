import React from 'react'

const Select = ({
  name,
  value,
  label = false,
  onChange = e => null,
  options = [],
  className = '',
  props = {}
}) => {
  return (
    <div className={`input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((opt, i) =>
          <option key={opt.label} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  )
}

export default Select
