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
  getOrderSuccess: ['payload', 'page'],
  getOrderFailure: null,
  getOrderProcessRequest: ['data'],
  getOrderProcessSuccess: ['payload', 'page'],
  getOrderProcessFailure: null,
  getOrderNextProcessRequest: ['data'],
  getOrderNextProcessSuccess: ['payload', 'page'],
  getOrderNextProcessFailure: null,
  getOrderFinishRequest: ['data'],
  getOrderFinishSuccess: ['payload', 'page'],
  getOrderFinishFailure: null,
  addBarangRequest: ['data'],
  addBarangSuccess: ['payload'],
  deleteBarangRequest: ['data'],
  deleteBarangSuccess: ['payload'],
  editBarangRequest: ['data'],
  editBarangSuccess: ['payload'],
  resetBarang: null,

  pickBarangRequest: ['data'],
  pickBarangSuccess: ['payload'],
  pickBarangFailure: null,

  kirimBarangRequest: ['data'],
  kirimBarangSuccess: ['payload'],
  kirimBarangFailure: null,

  barangSampaiRequest: ['data'],
  barangSampaiSuccess: ['payload'],
  barangSampaiFailure: null,

  getSalesListOrderRequest: ['data'],
  getSalesListOrderSuccess: ['payload', 'page'],
  getSalesListOrderFailure: null,

  uploadFotoBarangRequest: ['data'],
  uploadFotoBarangSuccess: ['payload'],
  uploadFotoBarangFailure: null,

  kurirSetorRequest: ['data'],
  kurirSetorSuccess: ['payload'],
  kurirSetorFailure: null,

  kurirSetorListRequest: ['data'],
  kurirSetorListSuccess: ['payload', 'page'],
  kurirSetorListFailure: null,

  cekUserRequest: ['data'],
  cekUserSuccess: ['payload', 'page'],
  cekUserFailure: null,

  getListTokoRequest: null,
  getListTokoSuccess: ['payload'],
  getListTokoFailure: null,

  cancelOrderRequest: ['data'],
  cancelOrderSuccess: ['payload'],
  cancelOrderFailure: null,

  getListHistoryRequest: ['data'],
  getListHistorySuccess: ['payload', 'page'],
  getListHistoryFailure: null,

  cancelPickRequest: ['data'],
  cancelPickSuccess: ['payload'],
  cancelPickFailure: null,

  closeOrderRequest: ['data'],
  closeOrderSuccess: ['payload'],
  closeOrderFailure: null,
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  createOrder: DEFAULT_STATE,
  getBarang: DEFAULT_STATE,
  getOrder: DEFAULT_STATE,
  getOrderProcess: DEFAULT_STATE,
  getOrderFinish: DEFAULT_STATE,
  getOrderNextProcess: DEFAULT_STATE,
  addBarang: DEFAULT_STATE,
  deleteBarang: DEFAULT_STATE,
  editBarang: DEFAULT_STATE,
  listBarang: [],
  listOrder: [],
  listOrderProcess: [],
  listOrderNextProcess: [],
  listOrderFinish: [],
  salesListOrder: [],
  pickBarang: DEFAULT_STATE,
  kirimBarang: DEFAULT_STATE,
  barangSampai: DEFAULT_STATE,
  getSalesListOrder: DEFAULT_STATE,
  uploadFotoBarang: DEFAULT_STATE,
  kurirSetor: DEFAULT_STATE,
  kurirSetorList: DEFAULT_STATE,
  kurirSetorListData: [],
  cekUser: DEFAULT_STATE,
  dataUser: {
    User_Id: '',
    Nama_User: '',
    No_Telepon: ''
  },
  getListToko: DEFAULT_STATE,
  listToko: [],
  cancelOrder: DEFAULT_STATE,
  getListHistory: DEFAULT_STATE,
  listHistory: [],
  cancelPick: DEFAULT_STATE,
  closeOrder: DEFAULT_STATE
})

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  getData: state => state.order.listBarang,
  getListOrderNextProcess: state => state.order.listOrderNextProcess
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

export const getOrderSuccess = (state, { payload, page }) => {
  console.tron.error({ payload })
  let newList = [...state.listOrder]
  if (page === 1) {
    newList = payload
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  }
  return state.merge({ ...state, getOrder: { fetching: false, error: null, payload }, listOrder: newList })
}

export const getOrderFailure = state =>
  state.merge({ ...state, getOrder: { fetching: false, error: true, payload: null } })

export const getOrderProcessRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getOrderProcess: { fetching: true, data, payload: null } })
}

export const getOrderProcessSuccess = (state, { payload, page }) => {
  let newList = [...state.listOrderProcess]
  if (page === 1) {
    newList = payload
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  }
  return state.merge({ ...state, getOrderProcess: { fetching: false, error: null, payload }, listOrderProcess: newList })
}

export const getOrderProcessFailure = state =>
  state.merge({ ...state, getOrderProcess: { fetching: false, error: true, payload: null } })

export const getOrderNextProcessRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getOrderNextProcess: { fetching: true, data, payload: null } })
}

export const getOrderNextProcessSuccess = (state, { payload, page }) => {
  let newList = [...state.listOrderNextProcess]
  if (page === 1) {
    newList = payload
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  }
  return state.merge({ ...state, getOrderNextProcess: { fetching: false, error: null, payload }, listOrderNextProcess: newList })
}

export const getOrderNextProcessFailure = state =>
  state.merge({ ...state, getOrderNextProcess: { fetching: false, error: true, payload: null } })


export const getOrderFinishRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getOrderFinish: { fetching: true, data, payload: null } })
}

export const getOrderFinishSuccess = (state, { payload, page }) => {
  let newList = [...state.listOrderFinish]
  if (page === 1) {
    newList = payload
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  }
  return state.merge({ ...state, getOrderFinish: { fetching: false, error: null, payload }, listOrderFinish: newList })
}

export const getOrderFinishFailure = state =>
  state.merge({ ...state, getOrderFinish: { fetching: false, error: true, payload: null } })


export const createOrderRequest = (state, { data }) =>
  state.merge({ ...state, createOrder: { fetching: true, data, payload: null } })

// successful api lookup
export const createOrderSuccess = (state, { payload }) =>
  state.merge({ ...state, createOrder: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const createOrderFailure = state =>
  state.merge({ ...state, createOrder: { fetching: false, error: true, payload: null } })

export const kirimBarangRequest = (state, { data }) =>
  state.merge({ ...state, kirimBarang: { fetching: true, data, payload: null } })

// successful api lookup
export const kirimBarangSuccess = (state, { payload }) =>
  state.merge({ ...state, kirimBarang: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const kirimBarangFailure = state =>
  state.merge({ ...state, kirimBarang: { fetching: false, error: true, payload: null } })

export const pickBarangRequest = (state, { data }) =>
  state.merge({ ...state, pickBarang: { fetching: true, data, payload: null } })

// successful api lookup
export const pickBarangSuccess = (state, { payload }) =>
  state.merge({ ...state, pickBarang: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const pickBarangFailure = state =>
  state.merge({ ...state, pickBarang: { fetching: false, error: true, payload: null } })

export const barangSampaiRequest = (state, { data }) =>
  state.merge({ ...state, barangSampai: { fetching: true, data, payload: null } })

// successful api lookup
export const barangSampaiSuccess = (state, { payload }) =>
  state.merge({ ...state, barangSampai: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const barangSampaiFailure = state =>
  state.merge({ ...state, barangSampai: { fetching: false, error: true, payload: null } })

export const getSalesListOrderRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getSalesListOrder: { fetching: true, data, payload: null } })
}

export const getSalesListOrderSuccess = (state, { payload, page }) => {
  console.tron.error({ payload })
  let newList = [...state.salesListOrder]
  if (page === 1) {
    newList = mergeAndReplace([], payload, 'Row_Id', 'Tgl_Penjualan', 'asc', true)
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Tgl_Penjualan', 'asc', true)
  }
  return state.merge({ ...state, getSalesListOrder: { fetching: false, error: null, payload }, salesListOrder: newList })
}

export const getSalesListOrderFailure = state =>
  state.merge({ ...state, getSalesListOrder: { fetching: false, error: true, payload: null } })

export const uploadFotoBarangRequest = (state, { data }) => {
  return state.merge({ ...state, uploadFotoBarang: { fetching: true, data, payload: null } })
}

export const uploadFotoBarangSuccess = (state, { payload }) => {
  return state.merge({ ...state, uploadFotoBarang: { fetching: false, error: null, payload } })
}

export const uploadFotoBarangFailure = state =>
  state.merge({ ...state, uploadFotoBarang: { fetching: false, error: true, payload: null } })


export const kurirSetorRequest = (state, { data }) =>
  state.merge({ ...state, kurirSetor: { fetching: true, data, payload: null } })

// successful api lookup
export const kurirSetorSuccess = (state, { payload }) =>
  state.merge({ ...state, kurirSetor: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const kurirSetorFailure = state =>
  state.merge({ ...state, kurirSetor: { fetching: false, error: true, payload: null } })

export const kurirSetorListRequest = (state, { data }) =>
  state.merge({ ...state, kurirSetorList: { fetching: true, data, payload: null } })

// successful api lookup
export const kurirSetorListSuccess = (state, { payload, page }) => {
  let newList = [...state.kurirSetorListData]
  if (page === 1) {
    newList = mergeAndReplace([], payload, 'Row_Id', 'Row_Id', 'asc', false)
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  }
  return state.merge({ ...state, kurirSetorList: { fetching: false, error: null, payload }, kurirSetorListData: newList })
}

// Something went wrong somewhere.
export const kurirSetorListFailure = state =>
  state.merge({ ...state, kurirSetorList: { fetching: false, error: true, payload: null } })

export const cekUserRequest = (state, { data }) =>
  state.merge({ ...state, cekUser: { fetching: true, data, payload: null } })

// successful api lookup
export const cekUserSuccess = (state, { payload }) =>
  state.merge({ ...state, cekUser: { fetching: false, error: null, payload }, dataUser: payload })

// Something went wrong somewhere.
export const cekUserFailure = state =>
  state.merge({
    ...state,
    cekUser: { fetching: false, error: true, payload: null },
    dataUser: {
      User_Id: '',
      Nama_User: '',
      No_Telepon: ''
    }
  })

export const getListTokoRequest = (state) =>
  state.merge({ ...state, getListToko: { fetching: true, payload: null } })

export const getListTokoSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, getListToko: { fetching: false, error: null, payload }, listToko: payload })
}

// Something went wrong somewhere.
export const getListTokoFailure = state =>
  state.merge({ ...state, getListToko: { fetching: false, error: true, payload: null } })

export const cancelOrderRequest = (state, { data }) =>
  state.merge({ ...state, cancelOrder: { fetching: true, data, payload: null } })

export const cancelOrderSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, cancelOrder: { fetching: false, error: null, payload } })
}

// Something went wrong somewhere.
export const cancelOrderFailure = state =>
  state.merge({ ...state, cancelOrder: { fetching: false, error: true, payload: null } })

export const getListHistoryRequest = (state, { data }) => {
  console.tron.error({ data })
  return state.merge({ ...state, getListHistory: { fetching: true, data, payload: null } })
}

export const getListHistorySuccess = (state, { payload, page }) => {
  let newList = [...state.listHistory]
  if (page === 1) {
    newList = payload
  } else {
    newList = mergeAndReplace(newList, payload, 'Row_Id', 'Row_Id', 'asc', false)
  }
  return state.merge({ ...state, getListHistory: { fetching: false, error: null, payload }, listHistory: newList })
}

export const getListHistoryFailure = state =>
  state.merge({ ...state, getListHistory: { fetching: false, error: true, payload: null } })

export const cancelPickRequest = (state, { data }) =>
  state.merge({ ...state, cancelPick: { fetching: true, data, payload: null } })

// successful api lookup
export const cancelPickSuccess = (state, { payload }) =>
  state.merge({ ...state, cancelPick: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const cancelPickFailure = state =>
  state.merge({ ...state, cancelPick: { fetching: false, error: true, payload: null } })

export const closeOrderRequest = (state, { data }) =>
  state.merge({ ...state, closeOrder: { fetching: true, data, payload: null } })

// successful api lookup
export const closeOrderSuccess = (state, { payload }) =>
  state.merge({ ...state, closeOrder: { fetching: false, error: null, payload } })

// Something went wrong somewhere.
export const closeOrderFailure = state =>
  state.merge({ ...state, closeOrder: { fetching: false, error: true, payload: null } })


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
  [Types.GET_ORDER_NEXT_PROCESS_REQUEST]: getOrderNextProcessRequest,
  [Types.GET_ORDER_NEXT_PROCESS_SUCCESS]: getOrderNextProcessSuccess,
  [Types.GET_ORDER_NEXT_PROCESS_FAILURE]: getOrderNextProcessFailure,
  [Types.GET_ORDER_FINISH_REQUEST]: getOrderFinishRequest,
  [Types.GET_ORDER_FINISH_SUCCESS]: getOrderFinishSuccess,
  [Types.GET_ORDER_FINISH_FAILURE]: getOrderFinishFailure,
  [Types.ADD_BARANG_REQUEST]: addBarangRequest,
  [Types.ADD_BARANG_SUCCESS]: addBarangSuccess,
  [Types.DELETE_BARANG_REQUEST]: deleteBarangRequest,
  [Types.DELETE_BARANG_SUCCESS]: deleteBarangSuccess,
  [Types.EDIT_BARANG_REQUEST]: editBarangRequest,
  [Types.EDIT_BARANG_SUCCESS]: editBarangSuccess,
  [Types.RESET_BARANG]: resetBarang,
  [Types.PICK_BARANG_REQUEST]: pickBarangRequest,
  [Types.PICK_BARANG_SUCCESS]: pickBarangSuccess,
  [Types.PICK_BARANG_FAILURE]: pickBarangFailure,
  [Types.KIRIM_BARANG_REQUEST]: kirimBarangRequest,
  [Types.KIRIM_BARANG_SUCCESS]: kirimBarangSuccess,
  [Types.KIRIM_BARANG_FAILURE]: kirimBarangFailure,
  [Types.BARANG_SAMPAI_REQUEST]: barangSampaiRequest,
  [Types.BARANG_SAMPAI_SUCCESS]: barangSampaiSuccess,
  [Types.BARANG_SAMPAI_FAILURE]: barangSampaiFailure,
  [Types.UPLOAD_FOTO_BARANG_REQUEST]: uploadFotoBarangRequest,
  [Types.UPLOAD_FOTO_BARANG_SUCCESS]: uploadFotoBarangSuccess,
  [Types.UPLOAD_FOTO_BARANG_FAILURE]: uploadFotoBarangFailure,

  [Types.GET_SALES_LIST_ORDER_REQUEST]: getSalesListOrderRequest,
  [Types.GET_SALES_LIST_ORDER_SUCCESS]: getSalesListOrderSuccess,
  [Types.GET_SALES_LIST_ORDER_FAILURE]: getSalesListOrderFailure,

  [Types.KURIR_SETOR_REQUEST]: kurirSetorRequest,
  [Types.KURIR_SETOR_SUCCESS]: kurirSetorSuccess,
  [Types.KURIR_SETOR_FAILURE]: kurirSetorFailure,

  [Types.KURIR_SETOR_LIST_REQUEST]: kurirSetorListRequest,
  [Types.KURIR_SETOR_LIST_SUCCESS]: kurirSetorListSuccess,
  [Types.KURIR_SETOR_LIST_FAILURE]: kurirSetorListFailure,

  [Types.CEK_USER_REQUEST]: cekUserRequest,
  [Types.CEK_USER_SUCCESS]: cekUserSuccess,
  [Types.CEK_USER_FAILURE]: cekUserFailure,

  [Types.GET_LIST_TOKO_REQUEST]: getListTokoRequest,
  [Types.GET_LIST_TOKO_SUCCESS]: getListTokoSuccess,
  [Types.GET_LIST_TOKO_FAILURE]: getListTokoFailure,

  [Types.CANCEL_ORDER_REQUEST]: cancelOrderRequest,
  [Types.CANCEL_ORDER_SUCCESS]: cancelOrderSuccess,
  [Types.CANCEL_ORDER_FAILURE]: cancelOrderFailure,

  [Types.CANCEL_PICK_REQUEST]: cancelPickRequest,
  [Types.CANCEL_PICK_SUCCESS]: cancelPickSuccess,
  [Types.CANCEL_PICK_FAILURE]: cancelPickFailure,

  [Types.GET_LIST_HISTORY_REQUEST]: getListHistoryRequest,
  [Types.GET_LIST_HISTORY_SUCCESS]: getListHistorySuccess,
  [Types.GET_LIST_HISTORY_FAILURE]: getListHistoryFailure,

  [Types.CLOSE_ORDER_REQUEST]: closeOrderRequest,
  [Types.CLOSE_ORDER_SUCCESS]: closeOrderSuccess,
  [Types.CLOSE_ORDER_FAILURE]: closeOrderFailure,
})
