import {
  ADD_BOOK,
  REMOVE_BOOK,
  SET_BOOKS,
  SET_ERROR,
  UPDATE_BOOK,
  USER_LOGIN,
  USER_LOGOUT,
  NEXT_PAGE,
  PREV_PAGE,
  SET_PER_PAGE,
  SET_SEARCH,
  SET_PAGE
} from './constants'
import * as storage from '../utils/storage'

export const initialAuthState = {
  user: storage.getUser(),
  error: false,
}

export const initialBooksState = {
  books: [],
  booksCount: 0,
  error: false,
  page: 1,
  perPage: 10,
  maxPage: 1,
  search: ''
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        error: false
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: false,
        error: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const booksReducer = (state, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload.results,
        booksCount: action.payload.length,
        error: false,
        maxPage: Math.ceil(action.payload.length / state.perPage)
      }
    case ADD_BOOK:
      return {
        ...state,
        booksCount: state.booksCount + 1,
        error: false
      }
    case REMOVE_BOOK:
      return {
        ...state,
        booksCount: state.booksCount - 1,
        error: false
      }
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(b => b.id === action.payload.id ? action.payload : b),
        selected: action.payload,
        error: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
        page: 1
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        page: 1
      }
    default:
      return state
  }
}
