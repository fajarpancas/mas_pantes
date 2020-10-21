import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { DEFAULT_STATE } from '../Data/Const'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveFcmToken: ['token'],
})

export const InboxTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fcmToken: ''
})

/* ------------- Selectors ------------- */

export const InboxSelectors = {
  getFcmToken: state => state.inbox.fcmToken
}

/* ------------- Reducers ------------- */

// request the data from an api
export const saveFcmToken = (state, { token }) =>
  state.merge({ ...state, fcmToken: token })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_FCM_TOKEN]: saveFcmToken,
})
