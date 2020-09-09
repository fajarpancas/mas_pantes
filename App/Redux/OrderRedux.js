import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const';
import { mergeAndReplace } from '../Lib/Helper'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBarangRequest: ['data'],
  getBarangSuccess: ['payload'],
  getBarangFailure: null,
  resetBarang: null
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getBarang: DEFAULT_STATE,
  listBarang: []
})

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const getBarangRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getBarang: { fetching: true, data, payload: null } })
}

// successful api lookup
export const getBarangSuccess = (state, action) => {
  let newList = [...state.listBarang]
  const { payload } = action
  newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  return state.merge({ ...state, getBarang: { fetching: false, error: null, payload }, listBarang: newList })
}

// Something went wrong somewhere.
export const getBarangFailure = state =>
  state.merge({ ...state, getBarang: { fetching: false, error: true, payload: null } })

export const resetBarang = state =>
  state.merge({ ...INITIAL_STATE })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BARANG_REQUEST]: getBarangRequest,
  [Types.GET_BARANG_SUCCESS]: getBarangSuccess,
  [Types.GET_BARANG_FAILURE]: getBarangFailure,
  [Types.RESET_BARANG]: resetBarang
})