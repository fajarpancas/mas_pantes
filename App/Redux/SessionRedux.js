import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveUserSession: ['data'],
  saveTokenAuth: ['data'],
  logout: null
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  userSession: null,
  token: null
})

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const saveUserSession = (state, { data }) =>
  state.merge({ ...state, userSession: data, isLoggedIn: true })

// successful api lookup
export const saveTokenAuth = (state, { data }) =>
  state.merge({ ...state, token: data })

export const logout = (state) =>
  state.merge({ ...INITIAL_STATE })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_SESSION]: saveUserSession,
  [Types.SAVE_TOKEN_AUTH]: saveTokenAuth
})
