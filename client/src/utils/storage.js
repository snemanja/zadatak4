export const saveUser = user => {
  window.localStorage.setItem('_user', btoa(JSON.stringify(user)))
}

export const getUser = () => {
  const user = window.localStorage.getItem('_user')
  if (user && user !== '') {
    return JSON.parse(atob(user))
  }
  return false
}

export const removeUser = () => {
  window.localStorage.removeItem('_user')
}
