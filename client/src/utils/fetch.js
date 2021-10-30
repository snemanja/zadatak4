export const get = async (url, headers = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}

export const post = async (url, requestData, headers = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  const data = await response.json()
  return data
}

export const del = async (url, headers = {}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}

export const put = async (url, requestData, headers = {}) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  const data = await response.json()
  return data
}
