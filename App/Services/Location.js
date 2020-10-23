import {
    call,
    put,
    take,
    all,
    cancelled,
    cancel,
    fork,
    select,
} from 'redux-saga/effects';
import { API_KEY } from '../Data/Const'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import SessionActions from '../Redux/SessionRedux'

export function* getLocation() {

    let lokasi = ''

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
    yield put(SessionActions.upIndexing())
    console.tron.error({ fullAddress })
}