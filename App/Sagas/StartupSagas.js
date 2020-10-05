import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'
import { SessionSelectors } from '../Redux/SessionRedux'
import { delay } from '../Lib/Helper';
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
      NavigationServices.navigate('AppKurir')
    } else if (idRole === 3) {
      NavigationServices.navigate('App')
    }
  } else {
    NavigationServices.navigate('Auth')
  }
}
