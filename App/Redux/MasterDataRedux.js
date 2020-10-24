import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getListUserRequest: null,
  getListUserSuccess: ['payload'],
  getListUserFailure: null,

  getListKurirRequest: null,
  getListKurirSuccess: ['payload'],
  getListKurirFailure: null
})

export const MasterDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getListUser: DEFAULT_STATE,
  listUser: [],
  getListKurir: DEFAULT_STATE,
  listKurir: []
})

/* ------------- Selectors ------------- */

export const MasterDataSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getListUserRequest = (state) =>
  state.merge({ ...state, getListUser: { fetching: true, payload: null } })

// successful api lookup
export const getListUserSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, getListUser: { fetching: false, error: null, payload }, listUser: payload })
}

// Something went wrong somewhere.
export const getListUserFailure = state =>
  state.merge({ ...state, getListUser: { fetching: false, error: true, payload: null } })

// request the data from an api
export const getListKurirRequest = (state) =>
  state.merge({ ...state, getListKurir: { fetching: true, payload: null } })

// successful api lookup
export const getListKurirSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, getListKurir: { fetching: false, error: null, payload }, listKurir: payload })
}

// Something went wrong somewhere.
export const getListKurirFailure = state =>
  state.merge({ ...state, getListKurir: { fetching: false, error: true, payload: null } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_USER_REQUEST]: getListUserRequest,
  [Types.GET_LIST_USER_SUCCESS]: getListUserSuccess,
  [Types.GET_LIST_USER_FAILURE]: getListUserFailure,

  [Types.GET_LIST_KURIR_REQUEST]: getListKurirRequest,
  [Types.GET_LIST_KURIR_SUCCESS]: getListKurirSuccess,
  [Types.GET_LIST_KURIR_FAILURE]: getListKurirFailure
})
