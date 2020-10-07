import { call, put, all } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { DropDownHolder } from '../Components'
import NavigationServices from '../Services/NavigationServices'
import SessionActions from '../Redux/SessionRedux'
import OrderActions from '../Redux/OrderRedux'
import { delay } from '../Lib/Helper';
import { Method } from 'react-native-awesome-component';

export function* login(api, action) {
  try {
    const { data } = action
    const randomA = Math.floor(Math.random() * 100000) + 1
    const randomB = Math.floor(Math.random() * 100000) + 1
    const noPenjualan = randomA.toString() + randomB.toString()

    const response = yield call(api.login, data)

    if (response.ok) {
      const { data } = response.data
      const { token_user, Id_Role } = data

      api.api.setHeaders({ Authorization: `bearer ${token_user}` });

      if (Id_Role === 1) {
        const param = {
          page: 1,
          Id_Sales: data.Id_Sales
        }
        NavigationServices.navigate('AppSales')
        yield put(OrderActions.getSalesListOrderRequest(param))
      } else if (Id_Role === 2) {
        NavigationServices.navigate('AppKurir')
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
