/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { Method } from 'react-native-awesome-component';
import { call, put, select } from 'redux-saga/effects'
import OrderActions, { OrderSelectors } from '../Redux/OrderRedux'
import { DropDownHolder } from '../Components'
import NavigationService from '../Services/NavigationServices'
// import { OrderSelectors } from '../Redux/OrderRedux'

export function* getOrder(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(OrderSelectors.getData)
  // make the call to the api
  const response = yield call(api.getorder, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(OrderActions.orderSuccess(response.data))
  } else {
    yield put(OrderActions.orderFailure())
  }
}

export function* getBarang(api, action) {
  try {
    const { data } = action
    const response = yield call(api.getBarang, data)
    if (response.ok) {
      yield put(OrderActions.getBarangSuccess(response.data.data))
      Method.LoadingHelper.hideLoading()
    } else {
      DropDownHolder.alert('error', 'Gagal', `Barang dengan kode ${data.Kode_Barcode} tidak ditemukan.`)
      Method.LoadingHelper.hideLoading()
      yield put(OrderActions.getBarangFailure())

    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    Method.LoadingHelper.hideLoading()
    console.tron.error({ err: err.message })
  }
}

export function* addBarang(api, action) {
  yield put(OrderActions.addBarangSuccess(action.data))
  NavigationService.goBack()
}

export function* deleteBarang(api, action) {
  const dataBarang = yield select(OrderSelectors.getData)
  const { data } = action

  const newDataBarang = dataBarang.filter(obj => obj.id !== data.id)
  yield put(OrderActions.deleteBarangSuccess(newDataBarang))
}

export function* editBarang(api, action) {
  const dataBarang = yield select(OrderSelectors.getData)
  const { data } = action

  const newData = dataBarang.map(obj => {
    if (obj.id === data.id) {
      return data
    } else {
      return obj
    }
  })

  yield put(OrderActions.editBarangSuccess(newData))
  NavigationService.goBack()
}

export function* getOrderList(api, action) {
  try {
    const { data } = action
    const response = yield call(api.getListOrder, data)
    if (response.ok) {
      console.tron.error({dataaa:response.data})
      yield put(OrderActions.getOrderSuccess(response.data.data))
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data order.`)
      yield put(OrderActions.getOrderFailure())

    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.getOrderFailure())
  }
}