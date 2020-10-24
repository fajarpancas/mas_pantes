import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: null,

  logoutRequest: null,
  logoutSuccess: ['payload'],
  logoutFailure: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  login: DEFAULT_STATE,
  logout: DEFAULT_STATE
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const loginRequest = (state, { data }) =>
  state.merge({ ...state, login: { fetching: true, data, payload: null } })

export const loginSuccess = (state, { payload }) =>
  state.merge({ ...state, login: { fetching: false, error: null, payload } })

export const loginFailure = state =>
  state.merge({ ...state, login: { fetching: false, error: true, payload: null } })

export const logoutRequest = (state) =>
  state.merge({ ...state, logout: { fetching: true, payload: null } })

export const logoutSuccess = (state, { payload }) =>
  state.merge({ ...state, logout: { fetching: false, error: null, payload } })

export const logoutFailure = state =>
  state.merge({ ...state, logout: { fetching: false, error: true, payload: null } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,

  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure
})
