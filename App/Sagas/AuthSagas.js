import { call, put, all, take, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { DropDownHolder } from '../Components'
import NavigationServices from '../Services/NavigationServices'
import SessionActions from '../Redux/SessionRedux'
import OrderActions, { OrderTypes, OrderSelectors } from '../Redux/OrderRedux'
import { InboxSelectors } from '../Redux/InboxRedux'
import { delay } from '../Lib/Helper';
import { Method } from 'react-native-awesome-component';

export function* login(api, action) {
  try {
    const { data } = action
    const randomA = Math.floor(Math.random() * 100000) + 1
    const randomB = Math.floor(Math.random() * 100000) + 1
    const noPenjualan = randomA.toString() + randomB.toString()

    const fcmToken = yield select(InboxSelectors.getFcmToken)

    const response = yield call(api.login, data)

    if (response.ok) {
      const { data } = response.data
      const { token_user, Id_Role, Id_User } = data

      const paramFCM = {
        Id_User,
        token_fcm: fcmToken
      }

      const saveFCM = yield call(api.saveTokenFCM, paramFCM)
      if(saveFCM.ok){
        console.tron.error('saveFCMSuccess')
      }

      api.api.setHeaders({ Authorization: `bearer ${token_user}` });

      if (Id_Role === 1) {
        const param = {
          page: 1,
          Id_Sales: data.Id_Sales
        }
        NavigationServices.navigate('AppSales')
        yield put(OrderActions.getSalesListOrderRequest(param))
      } else if (Id_Role === 2) {
        let listKirim = [];
        const param = {
          page: 1,
          Kurir_Id: data.Id_Kurir
        }
        yield put(OrderActions.getOrderNextProcessRequest(param))
        const action = yield take([
          OrderTypes.GET_ORDER_NEXT_PROCESS_SUCCESS,
          OrderTypes.GET_ORDER_NEXT_PROCESS_FAILURE,
        ]);

        if (action.type === OrderTypes.GET_ORDER_NEXT_PROCESS_SUCCESS) {
          listKirim = yield select(OrderSelectors.getListOrderNextProcess);
        }

        console.tron.error({ listKirim })
        // if (listKirim.length > 0) {
        //   NavigationServices.navigate('KurirLocationTracking', { data: listKirim[0] })
        // } else {
        NavigationServices.navigate('AppKurir')
        // }
      } else if (Id_Role === 3) {
        NavigationServices.navigate('App')
      }

      yield all([
        put(SessionActions.saveUserSession(data)),
        put(SessionActions.saveTokenAuth(token_user)),
        put(SessionActions.saveNoPenjualan(noPenjualan)),
        put(AuthActions.loginSuccess(data))
      ])
      // DropDownHolder.alert('success', 'Login Berhasil', `hai ${data.Nama_User}, selamat datang di aplikasi pantes gold`)

    } else {
      DropDownHolder.alert('error', 'Login Gagal', `maaf, nomor telepon dan kata sandi yang anda masukkan salah`)
      yield put(AuthActions.loginFailure())
    }
  } catch (err) {
    yield put(AuthActions.loginFailure())
    DropDownHolder.alert('error', 'Login Gagal', err.message)
  }
}

export function* logout(api, action) {
  try {
    Method.LoadingHelper.showLoading()
    const response = yield call(api.logout)
    if (response.ok) {
      yield all([
        put(SessionActions.logout()),
        put(AuthActions.logoutSuccess(response.data))
      ])
      NavigationServices.navigate('Auth')
      Method.LoadingHelper.hideLoading()
    } else {
      yield put(AuthActions.logoutFailure())
      Method.LoadingHelper.hideLoading()
    }
  } catch {
    yield put(AuthActions.logoutFailure())
    Method.LoadingHelper.hideLoading()
  }
}
