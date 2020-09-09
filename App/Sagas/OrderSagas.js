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
import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
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
      Method.LoadingHelper.hideLoading()
      yield put(OrderActions.getBarangFailure())
    }
  } catch (err) {
    Method.LoadingHelper.hideLoading()
    console.tron.error({ err: err.message })
  }
}