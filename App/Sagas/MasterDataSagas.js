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

import { call, put } from 'redux-saga/effects'
import MasterDataActions from '../Redux/MasterDataRedux'
// import { MasterDataSelectors } from '../Redux/MasterDataRedux'

export function* getListUser(api, action) {
  try {
    const response = yield call(api.getListUser)
    if (response.ok) {
      yield put(MasterDataActions.getListUserSuccess(response.data.data))
    } else {
      yield put(MasterDataActions.getListUserFailure())
    }
  } catch {
    yield put(MasterDataActions.getListUserFailure())
  }
}

export function* getListKurir(api, action) {
  try {
    const response = yield call(api.getListKurir)
    if (response.ok) {
      yield put(MasterDataActions.getListKurirSuccess(response.data.data))
    } else {
      yield put(MasterDataActions.getListKurirFailure())
    }
  } catch {
    yield put(MasterDataActions.getListKurirFailure())
  }
}
