import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { OrderTypes } from '../Redux/OrderRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { MasterDataTypes } from '../Redux/MasterDataRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {
  addBarang,
  createOrder,
  deleteBarang,
  editBarang,
  getBarang,
  getOrderList,
  getOrderListProcess
} from './OrderSagas'
import { login, logout } from './AuthSagas'
import { getListKurir, getListUser } from './MasterDataSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(OrderTypes.GET_ORDER_REQUEST, getOrderList, api),
    takeLatest(OrderTypes.GET_ORDER_PROCESS_REQUEST, getOrderListProcess, api),
    takeLatest(OrderTypes.GET_BARANG_REQUEST, getBarang, api),
    takeLatest(OrderTypes.ADD_BARANG_REQUEST, addBarang, api),
    takeLatest(OrderTypes.DELETE_BARANG_REQUEST, deleteBarang, api),
    takeLatest(OrderTypes.EDIT_BARANG_REQUEST, editBarang, api),
    takeLatest(OrderTypes.CREATE_ORDER_REQUEST, createOrder, api),

    takeLatest(MasterDataTypes.GET_LIST_USER_REQUEST, getListUser, api),
    takeLatest(MasterDataTypes.GET_LIST_KURIR_REQUEST, getListKurir, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
