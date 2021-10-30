import React from 'react'
import {
  authReducer,
  initialAuthState,
  booksReducer,
  initialBooksState,
} from './reducer'
import { API_ROOT } from '../utils/constants'
import { post, get, del, put } from '../utils/fetch'
import {
  SET_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  SET_BOOKS,
  REMOVE_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  SET_SEARCH,
  SET_PER_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  SET_PAGE,
} from './constants'
import * as storage from '../utils/storage'

export const AuthContext = React.createContext({
  state: initialAuthState,
  dispatch: () => null,
})

export const BooksContext = React.createContext({
  state: initialBooksState,
  dispatch: () => null,
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthState)
  const value = React.useMemo(() => [state, dispatch], [state])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(booksReducer, initialBooksState)
  const value = React.useMemo(() => [state, dispatch], [state])

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  )
}

export const useAuth = () => {
  const [state, dispatch] = React.useContext(AuthContext)

  const login = async (username, password) => {
    try {
      const response = await post(`${API_ROOT}/login`, {
        username,
        password,
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      const user = response.body
      storage.saveUser(user)
      dispatch({ type: USER_LOGIN, payload: user })

      return user

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const logout = () => {
    storage.removeUser()
    dispatch({ type: USER_LOGOUT })
    return true
  }

  const usernameExists = async username => {
    try {
      const response = await get(`${API_ROOT}/checkUsername/${username}`)

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      return response.body

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const register = async (username, password) => {
    try {
      const response = await post(`${API_ROOT}/register`, {
        username,
        password,
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      return true

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const getToken = React.useCallback(() => {
    if (!state.user) return false
    return `Bearer ${state.user.jwt}`
  }, [state.user])

  const isAdmin = () => {
    if (state.user && state.user.hasOwnProperty('username'))
      return state.user.username === 'admin'
    return false
  }

  return {
    ...state,
    login,
    logout,
    register,
    usernameExists,
    getToken,
    isAdmin,
  }
}

export const useBooks = () => {
  const [state, dispatch] = React.useContext(BooksContext)
  const { getToken, isAdmin } = useAuth()

  const getLength = React.useCallback(
    (userPage = false, userPerPage = false) => {
      const page = userPage !== false ? userPage : state.page
      const perPage = userPerPage !== false ? userPerPage : state.perPage
      return {
        from: ((page * perPage) - perPage) + 1,
        to: page * perPage,
      }
    }, [state.page, state.perPage])

  const fetchBooks = React.useCallback(
    async (userPage = false, userPerPage = false, noDispatch = false) => {
      try {
        const { from, to } = getLength(userPage, userPerPage)
        const response = await get(`${API_ROOT}/books/${from}/${to}`, {
          'Authorization': getToken(),
        })

        if (response.status === 'err') {
          dispatch({ type: SET_ERROR, payload: response.body })
          return false
        }

        if (!noDispatch) dispatch({ type: SET_BOOKS, payload: response.body })
        return response.body

      } catch (e) {
        dispatch({ type: SET_ERROR, payload: e.message })
        return false
      }
    }, [dispatch, getToken, getLength])

  const searchBooks = React.useCallback(
    async (userSearch = false, userPage = false, userPerPage = false, noDispatch = false) => {
      try {
        const { from, to } = getLength(userPage, userPerPage)
        const search = userSearch !== false ? userSearch : state.search
        const response = await get(
          `${API_ROOT}/books/search/${search}/${from}/${to}`, {
            'Authorization': getToken(),
          })

        if (response.status === 'err') {
          dispatch({ type: SET_ERROR, payload: response.body })
          return false
        }

        if (!noDispatch) dispatch({ type: SET_BOOKS, payload: response.body })
        return response.body

      } catch (e) {
        dispatch({ type: SET_ERROR, payload: e.message })
        return false
      }
    }, [dispatch, getToken, getLength, state.search])

  const fetchBook = React.useCallback(async (id) => {
    try {
      const response = await get(`${API_ROOT}/book/${id}`, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      return response.body

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }, [dispatch, getToken])

  const removeBook = async id => {
    try {
      if (!isAdmin()) {
        return false
      }

      const response = await del(`${API_ROOT}/books/${id}`, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: REMOVE_BOOK, payload: id })
      window.alert('Book removed successfully')
      return true

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const updateBook = async data => {
    try {
      if (!isAdmin()) {
        return false
      }

      const response = await put(`${API_ROOT}/books/${data.id}`, data, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: UPDATE_BOOK, payload: data })
      window.alert('Book saved successfully')
      return true

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const addBook = async data => {
    try {
      if (!isAdmin()) {
        return false
      }

      const response = await post(`${API_ROOT}/books/new`, data, {
        'Authorization': getToken(),
      })

      if (response.status === 'err') {
        dispatch({ type: SET_ERROR, payload: response.body })
        return false
      }

      dispatch({ type: ADD_BOOK, payload: response.body })
      window.alert('Book added successfully')
      return response.body

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e.message })
      return false
    }
  }

  const clearError = () => dispatch({ type: SET_ERROR, payload: false })

  const setSearch = term => dispatch({ type: SET_SEARCH, payload: term })

  const setPerPage = count => dispatch({ type: SET_PER_PAGE, payload: count })

  const setPage = page => dispatch({ type: SET_PAGE, payload: page })

  const nextPage = () => dispatch({ type: NEXT_PAGE })

  const prevPage = () => dispatch({ type: PREV_PAGE })

  return {
    ...state,
    fetchBooks,
    searchBooks,
    fetchBook,
    removeBook,
    updateBook,
    addBook,
    clearError,
    setSearch,
    setPerPage,
    nextPage,
    prevPage,
    setPage
  }
}
