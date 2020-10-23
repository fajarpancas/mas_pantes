import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  trackingRequest: ['data'],
  trackingSuccess: ['payload'],
  trackingFailure: null,

  getLokasiKurirRequest: ['data'],
  getLokasiKurirSuccess: null,
  getLokasiKurirFailure: null,

  saveTrackingLokasi: ['lokasi'],
  setTrackingRequest: null,
  setTrackingFinish: null,
})

export const TrackingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tracking: DEFAULT_STATE,
  getLokasiKurir: DEFAULT_STATE,
  lokasiData: [],
  noPenjualanTracking: null,
  trackingRequest: false
})

/* ------------- Selectors ------------- */

export const TrackingSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const saveTrackingLokasi = (state, { lokasi }) => {
  const { Keterangan, No_Penjualan } = lokasi
  return state.merge({ ...state, lokasiData: Keterangan, noPenjualanTracking: No_Penjualan })
}

export const setTrackingRequest = (state) => {
  return state.merge({ ...state, trackingRequest: true })
}

export const setTrackingFinish = (state) => {
  return state.merge({ ...state, trackingRequest: false })
}

// request the data from an api
export const trackingRequest = (state, { data }) =>
  state.merge({ ...state, tracking: { fetching: true, data, payload: null } })

// successful api lookup
export const trackingSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, tracking: { fetching: false, error: null, payload } })
}

// Something went wrong somewhere.
export const trackingFailure = state =>
  state.merge({ ...state, tracking: { fetching: false, error: true, payload: null } })

export const getLokasiKurirRequest = (state, { data }) =>
  state.merge({ ...state, getLokasiKurir: { fetching: true, data, payload: null } })

// successful api lookup
export const getLokasiKurirSuccess = (state) => {
  return state.merge({ ...state, getLokasiKurir: { fetching: false, error: null, payload: 'success' } })
}

// Something went wrong somewhere.
export const getLokasiKurirFailure = state =>
  state.merge({ ...state, getLokasiKurir: { fetching: false, error: true, payload: null } })



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRACKING_REQUEST]: trackingRequest,
  [Types.TRACKING_SUCCESS]: trackingSuccess,
  [Types.TRACKING_FAILURE]: trackingFailure,

  [Types.GET_LOKASI_KURIR_REQUEST]: getLokasiKurirRequest,
  [Types.GET_LOKASI_KURIR_SUCCESS]: getLokasiKurirSuccess,
  [Types.GET_LOKASI_KURIR_FAILURE]: getLokasiKurirFailure,

  [Types.SAVE_TRACKING_LOKASI]: saveTrackingLokasi,
  [Types.SET_TRACKING_REQUEST]: setTrackingRequest,
  [Types.SET_TRACKING_FINISH]: setTrackingFinish,
})
