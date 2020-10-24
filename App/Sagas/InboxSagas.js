import { call, put } from 'redux-saga/effects'
import InboxActions from '../Redux/InboxRedux'

export function * getInbox (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(InboxSelectors.getData)
  // make the call to the api
  const response = yield call(api.getinbox, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(InboxActions.inboxSuccess(response.data))
  } else {
    yield put(InboxActions.inboxFailure())
  }
}
