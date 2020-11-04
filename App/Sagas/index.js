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
import { TrackingTypes } from '../Redux/TrackingRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {
  addBarang,
  barangSampai,
  cancelOrder,
  cancelPick,
  cekUSer,
  createOrder,
  deleteBarang,
  editBarang,
  getBarang,
  getKurirSetorList,
  getListHistory,
  getListToko,
  getOrderList,
  getOrderListDiambil,
  getOrderListFinish,
  getOrderListProcess,
  getSalesListOrder,
  kirimBarang,
  kurirSetor,
  pickBarang,
  uploadFotoBarang
} from './OrderSagas'
import { login, logout } from './AuthSagas'
import { getListKurir, getListUser } from './MasterDataSagas'
import { changeStatusKurir, getLokasiKurir, getTracking, postLokasiKurir } from './TrackingSagas'

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
    takeLatest(OrderTypes.GET_ORDER_NEXT_PROCESS_REQUEST, getOrderListDiambil, api),
    takeLatest(OrderTypes.GET_ORDER_FINISH_REQUEST, getOrderListFinish, api),
    takeLatest(OrderTypes.GET_SALES_LIST_ORDER_REQUEST, getSalesListOrder, api),
    takeLatest(OrderTypes.GET_BARANG_REQUEST, getBarang, api),
    takeLatest(OrderTypes.ADD_BARANG_REQUEST, addBarang, api),
    takeLatest(OrderTypes.DELETE_BARANG_REQUEST, deleteBarang, api),
    takeLatest(OrderTypes.EDIT_BARANG_REQUEST, editBarang, api),
    takeLatest(OrderTypes.CREATE_ORDER_REQUEST, createOrder, api),
    takeLatest(OrderTypes.PICK_BARANG_REQUEST, pickBarang, api),
    takeLatest(OrderTypes.KIRIM_BARANG_REQUEST, kirimBarang, api),
    takeLatest(OrderTypes.BARANG_SAMPAI_REQUEST, barangSampai, api),
    takeLatest(OrderTypes.UPLOAD_FOTO_BARANG_REQUEST, uploadFotoBarang, api),
    takeLatest(OrderTypes.KURIR_SETOR_REQUEST, kurirSetor, api),
    takeLatest(OrderTypes.KURIR_SETOR_LIST_REQUEST, getKurirSetorList, api),
    takeLatest(OrderTypes.CEK_USER_REQUEST, cekUSer, api),
    takeLatest(OrderTypes.GET_LIST_TOKO_REQUEST, getListToko, api),
    takeLatest(OrderTypes.CANCEL_ORDER_REQUEST, cancelOrder, api),
    takeLatest(OrderTypes.GET_LIST_HISTORY_REQUEST, getListHistory, api),
    takeLatest(OrderTypes.CANCEL_PICK_REQUEST, cancelPick, api),

    takeLatest(MasterDataTypes.GET_LIST_USER_REQUEST, getListUser, api),
    takeLatest(MasterDataTypes.GET_LIST_KURIR_REQUEST, getListKurir, api),

    takeLatest(TrackingTypes.TRACKING_REQUEST, getTracking, api),
    takeLatest(TrackingTypes.GET_LOKASI_KURIR_REQUEST, getLokasiKurir, api),
    takeLatest(TrackingTypes.CHANGE_STATUS_KURIR_REQUEST, changeStatusKurir, api),
    // takeLatest(TrackingTypes.POST_ALAMAT_REQUEST, postLokasiKurir, api),
    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
