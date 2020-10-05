import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const';
import { mergeAndReplace } from '../Lib/Helper'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBarangRequest: ['data'],
  getBarangSuccess: ['payload'],
  getBarangFailure: null,
  createOrderRequest: ['data'],
  createOrderSuccess: ['payload'],
  createOrderFailure: null,
  getOrderRequest: ['data'],
  getOrderSuccess: ['payload'],
  getOrderFailure: null,
  getOrderProcessRequest: ['data'],
  getOrderProcessSuccess: ['payload'],
  getOrderProcessFailure: null,
  addBarangRequest: ['data'],
  addBarangSuccess: ['payload'],
  deleteBarangRequest: ['data'],
  deleteBarangSuccess: ['payload'],
  editBarangRequest: ['data'],
  editBarangSuccess: ['payload'],
  resetBarang: null
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  createOrder: DEFAULT_STATE,
  getBarang: DEFAULT_STATE,
  getOrder: DEFAULT_STATE,
  getOrderProcess: DEFAULT_STATE,
  addBarang: DEFAULT_STATE,
  deleteBarang: DEFAULT_STATE,
  editBarang: DEFAULT_STATE,
  listBarang: [],
  listOrder: [],
  listOrderProcess: []
})

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  getData: state => state.order.listBarang
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

export const addBarangRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, addBarang: { data } })
}

export const addBarangSuccess = (state, { payload }) => {
  let newList = [...state.listBarang]
  newList = newList.concat(payload)
  return state.merge({ ...state, addBarang: { payload }, listBarang: newList })
}

export const deleteBarangRequest = (state, { data }) => {
  return state.merge({ ...state, deleteBarang: { data } })
}

export const deleteBarangSuccess = (state, { payload }) => {
  return state.merge({ ...state, deleteBarang: { payload }, listBarang: payload })
}

export const editBarangRequest = (state, { data }) => {
  return state.merge({ ...state, editBarang: { data } })
}

export const editBarangSuccess = (state, { payload }) => {
  return state.merge({ ...state, editBarang: { payload }, listBarang: payload })
}

export const resetBarang = state =>
  state.merge({ ...INITIAL_STATE })

export const getOrderRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getOrder: { fetching: true, data, payload: null } })
}

export const getOrderSuccess = (state, { payload }) => {
  console.tron.error({ payload })
  let newList = [...state.listOrder]
  // const { payload } = action
  newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  return state.merge({ ...state, getOrder: { fetching: false, error: null, payload }, listOrder: newList })
}

export const getOrderFailure = state =>
  state.merge({ ...state, getOrder: { fetching: false, error: true, payload: null } })

export const getOrderProcessRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getOrderProcess: { fetching: true, data, payload: null } })
}

export const getOrderProcessSuccess = (state, { payload }) => {
  let newList = [...state.listOrderProcess]
  // const { payload } = action
  newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  return state.merge({ ...state, getOrderProcess: { fetching: false, error: null, payload }, listOrderProcess: newList })
}

export const getOrderProcessFailure = state =>
  state.merge({ ...state, getOrderProcess: { fetching: false, error: true, payload: null } })


export const createOrderRequest = (state, { data }) =>
  state.merge({ ...state, createOrder: { fetching: true, data, payload: null } })

// successful api lookup
export const createOrderSuccess = (state, { payload }) =>
  state.merge({ ...state, createOrder: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const createOrderFailure = state =>
  state.merge({ ...state, createOrder: { fetching: false, error: true, payload: null } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BARANG_REQUEST]: getBarangRequest,
  [Types.GET_BARANG_SUCCESS]: getBarangSuccess,
  [Types.GET_BARANG_FAILURE]: getBarangFailure,
  [Types.CREATE_ORDER_REQUEST]: createOrderRequest,
  [Types.CREATE_ORDER_SUCCESS]: createOrderSuccess,
  [Types.CREATE_ORDER_FAILURE]: createOrderFailure,
  [Types.GET_ORDER_REQUEST]: getOrderRequest,
  [Types.GET_ORDER_SUCCESS]: getOrderSuccess,
  [Types.GET_ORDER_FAILURE]: getOrderFailure,
  [Types.GET_ORDER_PROCESS_REQUEST]: getOrderProcessRequest,
  [Types.GET_ORDER_PROCESS_SUCCESS]: getOrderProcessSuccess,
  [Types.GET_ORDER_PROCESS_FAILURE]: getOrderProcessFailure,
  [Types.ADD_BARANG_REQUEST]: addBarangRequest,
  [Types.ADD_BARANG_SUCCESS]: addBarangSuccess,
  [Types.DELETE_BARANG_REQUEST]: deleteBarangRequest,
  [Types.DELETE_BARANG_SUCCESS]: deleteBarangSuccess,
  [Types.EDIT_BARANG_REQUEST]: editBarangRequest,
  [Types.EDIT_BARANG_SUCCESS]: editBarangSuccess,
  [Types.RESET_BARANG]: resetBarang
})
