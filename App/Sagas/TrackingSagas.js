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

import { call, put, select } from 'redux-saga/effects'
import TrackingActions from '../Redux/TrackingRedux'
// import { TrackingSelectors } from '../Redux/TrackingRedux'
import { API_KEY } from '../Data/Const'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import SessionActions, { SessionSelectors } from '../Redux/SessionRedux'
import { delay } from '../Lib/Helper';
import { DropDownHolder } from '../Components'

export function* getTracking(api, action) {
  let lokasi = 'Gagal mendapatkan lokasi kurir'

  Geocoder.init(API_KEY)
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          console.log(json);
          var addressComponent = json.results[0].address_components;
          let fullAddress = ''
          for (let i = 0; i < addressComponent.length; i++) {
            if (i < addressComponent.length - 1) {
              fullAddress += `${addressComponent[i].long_name}, `
            } else {
              fullAddress += `${addressComponent[i].long_name}.`
            }
          }
          lokasi = fullAddress
        })
        .catch(error => console.warn(error));
    },
    (error) => {
      console.log(error.code, error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 100000
    }
  );

  yield delay(2500)

  console.tron.error({ thisisbrazil: lokasi })

  const data = yield select(SessionSelectors.getSalesId)
  const { keterangan } = data
  const { Id_Sales, No_Penjualan } = keterangan

  const param = {
    Id_Sales: Id_Sales,
    No_Penjualan: No_Penjualan,
    Detail_Address: lokasi
  }

  console.tron.error({ param })
  const response = yield call(api.postLokasiKurir, param)

  // success?
  if (response.ok) {
    yield put(TrackingActions.trackingSuccess(response.data))
  } else {
    yield put(TrackingActions.trackingFailure())
  }
}

export function* getLokasiKurir(api, action) {
  try {
    const { data } = action
    const response = yield call(api.getLokasiKurir, data)
    if (response.ok) {
      yield put(TrackingActions.getLokasiKurirSuccess())
    } else {
      yield put(TrackingActions.getLokasiKurirFailure())
    }
  } catch (err) {
    DropDownHolder.alert('error', 'Gagal', err.message)
    yield put(TrackingActions.getLokasiKurirFailure())
  }
}

// export function* postLokasiKurir(api, action) {
//   try {
//     const { data } = action
//     const response = yield call(api.postLokasiKurir, data)
//     if (response.ok) {
//       yield put(TrackingActions.postAlamatSuccess())
//     } else {
//       yield put(TrackingActions.postAlamatFailure())
//     }
//   } catch (err) {
//     DropDownHolder.alert('error', 'Gagal', err.message)
//     yield put(TrackingActions.postAlamatFailure())
//   }
// }