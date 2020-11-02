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
import { call, put, select, all } from 'redux-saga/effects'
import OrderActions, { OrderSelectors } from '../Redux/OrderRedux'
import { DropDownHolder } from '../Components'
import NavigationService from '../Services/NavigationServices'
import SessionActions from '../Redux/SessionRedux'

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
    const { page } = data
    console.tron.error({ data })
    const response = yield call(api.getListOrder, data)
    if (response.ok) {
      console.tron.error({ dataaa: response.data.data })
      yield put(OrderActions.getOrderSuccess(response.data.data, page))
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data order.`)
      yield put(OrderActions.getOrderFailure())

    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.getOrderFailure())
  }
}

export function* getOrderListProcess(api, action) {
  try {
    const { data } = action
    const { page } = data
    const response = yield call(api.getListOrderProcess, data)
    if (response.ok) {
      yield put(OrderActions.getOrderProcessSuccess(response.data.data, page))
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data order.`)
      yield put(OrderActions.getOrderProcessFailure())

    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.getOrderProcessFailure())
  }
}

export function* getOrderListFinish(api, action) {
  try {
    const { data } = action
    const { page } = data
    const response = yield call(api.getListOrderFinish, data)
    if (response.ok) {
      yield put(OrderActions.getOrderFinishSuccess(response.data.data, page))
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data order.`)
      yield put(OrderActions.getOrderFinishFailure())

    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.getOrderFinishFailure())
  }
}

export function* getSalesListOrder(api, action) {
  try {
    const { data } = action
    const { page } = data
    const response = yield call(api.getSalesListOrder, data)
    if (response.ok) {
      yield put(OrderActions.getSalesListOrderSuccess(response.data.data, page))
      console.tron.error('get sales order success')
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data order.`)
      yield put(OrderActions.getSalesListOrderFailure())
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.getSalesListOrderFailure())
  }
}

export function* getOrderListDiambil(api, action) {
  try {
    const { data } = action
    const { page } = data
    const response = yield call(api.getListOrderNextProcess, data)
    if (response.ok) {
      yield put(OrderActions.getOrderNextProcessSuccess(response.data.data, page))
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data order.`)
      yield put(OrderActions.getOrderNextProcessFailure())

    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.getOrderNextProcessFailure())
  }
}

export function* createOrder(api, action) {
  try {
    const { data } = action
    const { Id_Sales } = data
    const randomA = Math.floor(Math.random() * 100000) + 1
    const randomB = Math.floor(Math.random() * 100000) + 1
    const noPenjualan = randomA.toString() + randomB.toString()

    const response = yield call(api.createOrder, data)
    const param = {
      page: 1,
      Id_Sales
    }
    if (response.ok) {
      yield all([
        put(SessionActions.saveNoPenjualan(noPenjualan)),
        put(OrderActions.createOrderSuccess(response.data.data)),
        put(OrderActions.getSalesListOrderRequest(param))
        // put(OrderActions.resetBarang())
      ])
      Method.LoadingHelper.hideLoading()
      DropDownHolder.alert('success', 'KEMAS BARANG BERHASIL', `list orderan yg telah di kemas pada screen LIST ORDER.`)
      NavigationService.navigate('HomeSales')
    } else {
      DropDownHolder.alert('error', 'Gagal', `Kemas penjualan gagal`)
      Method.LoadingHelper.hideLoading()
      yield all([
        put(SessionActions.saveNoPenjualan(noPenjualan)),
        put(OrderActions.createOrderFailure())
      ])
    }
  } catch {
    DropDownHolder.alert('error', 'Gagal', `Kemas penjualan gagal`)
    Method.LoadingHelper.hideLoading()
    yield all([
      put(SessionActions.saveNoPenjualan(noPenjualan)),
      put(OrderActions.createOrderFailure())
    ])
  }
}

export function* pickBarang(api, action) {
  try {
    const { data } = action
    const { Kurir_Id } = data
    const param = {
      page: 1,
      Kurir_Id
    }
    const response = yield call(api.pickBarang, data)
    if (response.ok) {
      yield all([
        put(OrderActions.pickBarangSuccess(response.data.data)),
        put(OrderActions.getOrderRequest(param)),
        put(OrderActions.getOrderProcessRequest(param))
      ])
      Method.LoadingHelper.hideLoading()
      DropDownHolder.alert(
        'success',
        'BERHASIL MENGAMBIL ORDERAN',
        `Cek orderan yang sudah diambil pada tab menu DIAMBIL.`)
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil orderan.`)
      yield all([
        put(OrderActions.pickBarangFailure()),
        put(OrderActions.getOrderRequest(param)),
        put(OrderActions.getOrderProcessRequest(param))
      ])
      Method.LoadingHelper.hideLoading()
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.pickBarangFailure())
    Method.LoadingHelper.hideLoading()
  }
}

export function* kirimBarang(api, action) {
  try {
    const { data } = action
    const { Kurir_Id } = data
    const param = {
      page: 1,
      Kurir_Id
    }
    const response = yield call(api.kirimBarang, data)
    if (response.ok) {
      yield all([
        put(OrderActions.kirimBarangSuccess(response.data.data)),
        put(OrderActions.getOrderProcessRequest(param)),
        put(OrderActions.getOrderNextProcessRequest(param))
      ])
      DropDownHolder.alert(
        'success',
        'BERHASIL MENGESTIMASI WAKTU ORDERAN',
        `Cek orderan yang sudah diisi estimasi waktu sampai pada tab menu PROSES.`)
      Method.LoadingHelper.hideLoading()
    } else {
      if (response.data && response.data.message) {
        DropDownHolder.alert('error', 'GAGAL', response.data.message)
      } else {
        DropDownHolder.alert('error', 'GAGAL', `Gagal mengirim orderan.`)
      }
      yield all([
        put(OrderActions.kirimBarangFailure()),
        put(OrderActions.getOrderProcessRequest(param)),
        put(OrderActions.getOrderNextProcessRequest(param))
      ])
      Method.LoadingHelper.hideLoading()
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.kirimBarangFailure())
    Method.LoadingHelper.hideLoading()
  }
}

export function* barangSampai(api, action) {
  try {
    const { data } = action
    const { Kurir_Id } = data
    const param = {
      page: 1,
      Kurir_Id
    }
    const response = yield call(api.barangSampai, data)
    if (response.ok) {
      NavigationService.goBack()
      yield all([
        put(OrderActions.barangSampaiSuccess(response.data.data)),
        put(OrderActions.getOrderFinishRequest(param)),
        put(OrderActions.getOrderNextProcessRequest(param))
      ])
      DropDownHolder.alert(
        'success',
        'BERHASIL MENGISI DATA PENERIMA',
        `Cek orderan yang sudah selesai pada tab menu HISTORY.`)
      Method.LoadingHelper.hideLoading()
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengisi data penerima.`)
      yield all([
        put(OrderActions.barangSampaiFailure()),
      ])
      Method.LoadingHelper.hideLoading()
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.barangSampaiFailure())
    Method.LoadingHelper.hideLoading()
  }
}

export function* uploadFotoBarang(api, action) {
  try {
    const { data } = action
    const response = yield call(api.uploadFotoBarang, data)
    if (response.ok) {
      yield put(OrderActions.uploadFotoBarangSuccess(response.data))
    } else {
      yield put(OrderActions.uploadFotoBarangFailure())
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.uploadFotoBarangFailure())
  }
}

export function* kurirSetor(api, action) {
  try {
    const { data } = action
    const { Id_Sales } = data
    const param = {
      page: 1,
      Id_Sales
    }
    const response = yield call(api.kurirSetor, data)
    if (response.ok) {
      yield put(OrderActions.kurirSetorSuccess(response.data))
      yield put(OrderActions.getSalesListOrderRequest(param))
      Method.LoadingHelper.hideLoading()
      DropDownHolder.alert('success', 'Update Status Pembayaran', 'Status pembayaran berhasil diupdate')
    } else {
      yield put(OrderActions.kurirSetorFailure())
      Method.LoadingHelper.hideLoading()
      DropDownHolder.alert('error', 'Gagal', err.message)
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    Method.LoadingHelper.hideLoading()
    yield put(OrderActions.kurirSetorFailure())
  }
}

export function* getKurirSetorList(api, action) {
  try {
    const { data } = action
    const { page } = data
    const response = yield call(api.kurirSetorList, data)
    if (response.ok) {
      yield put(OrderActions.kurirSetorListSuccess(response.data.data, page))
    } else {
      DropDownHolder.alert('error', 'GAGAL', `Gagal mengambil data.`)
      yield put(OrderActions.kurirSetorListFailure())
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.kurirSetorListFailure())
  }
}

export function* cekUSer(api, action) {
  try {
    const { data } = action
    const response = yield call(api.cekUser, data)
    if (response.ok) {
      const { status } = response.data
      if (status) {
        yield put(OrderActions.cekUserSuccess(response.data.data))
      } else {
        yield put(OrderActions.cekUserFailure())
      }
    } else {
      yield put(OrderActions.cekUserFailure())
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(OrderActions.cekUserFailure())
  }
}

export function* getListToko(api, action) {
  try {
    const response = yield call(api.getListToko)
    if (response.ok) {
      yield put(OrderActions.getListTokoSuccess(response.data.data))
    } else {
      yield put(OrderActions.getListTokoFailure())
    }
  } catch {
    yield put(OrderActions.getListTokoFailure())
  }
}

export function* cancelOrder(api, action) {
  const { data } = action
  const { Id_Sales } = data
  const param = {
    page: 1,
    Id_Sales
  }
  try {
    const response = yield call(api.cancelOrder, data)
    if (response.ok) {
      yield put(OrderActions.cancelOrderSuccess(response.data))
      yield put(OrderActions.getSalesListOrderRequest(param))
      Method.LoadingHelper.hideLoading()
    } else {
      yield put(OrderActions.cancelOrderFailure())
      Method.LoadingHelper.hideLoading()
    }
  } catch {
    yield put(OrderActions.cancelOrderFailure())
    Method.LoadingHelper.hideLoading()
  }
}