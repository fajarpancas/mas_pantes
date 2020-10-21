import { call, put, all, take, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'
import { SessionSelectors } from '../Redux/SessionRedux'
import { delay } from '../Lib/Helper';
import OrderActions, {OrderTypes, OrderSelectors } from '../Redux/OrderRedux'
import NavigationServices from '../Services/NavigationServices'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function* startup(api, action) {
  const userStatus = yield select(SessionSelectors.getLoggedInStatus)
  const user = yield select(SessionSelectors.getUser)
  const token = yield select(SessionSelectors.getToken)
  let idRole;
  if(user){
    idRole = user.Id_Role
  }
  yield delay(500)

  api.api.setHeaders({ Authorization: `bearer ${token}` });

  if (userStatus) {
    if (idRole === 1) {
      NavigationServices.navigate('AppSales')
    } else if (idRole === 2) {
      let listKirim = [];
        const param = {
          page: 1,
          Kurir_Id: user.Id_Kurir
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
        if (listKirim.length > 0) {
          NavigationServices.navigate('KurirLocationTracking', { data: listKirim[0] })
        } else {
          NavigationServices.navigate('AppKurir')
        }
    } else if (idRole === 3) {
      NavigationServices.navigate('App')
    }
  } else {
    NavigationServices.navigate('Auth')
  }
}
