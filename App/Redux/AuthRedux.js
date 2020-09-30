import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  login: DEFAULT_STATE
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const loginRequest = (state, { data }) =>
  state.merge({ ...state, login: { fetching: true, data, payload: null } })

// successful api lookup
export const loginSuccess = (state, { payload }) =>
  state.merge({ ...state, login: { fetching: false, error: null, payload } })


// Something went wrong somewhere.
export const loginFailure = state =>
  state.merge({ ...state, login: { fetching: false, error: true, payload: null } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure
})
