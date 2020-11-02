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
    let locationResult = 'Gagal mendapatkan lokasi detail kurir, koneksi kurir mungkin tidak stabil'
    let latitude = -6.914864
    let longitude = 107.608238

    Geocoder.init(API_KEY)
    Geolocation.getCurrentPosition(
        (position) => {
            console.tron.error(position)
            latitude = position.coords.latitude
            longitude = position.coords.longitude
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
                    locationResult = json.results[0].formatted_address

                    const param = {
                        latitude,
                        longitude,
                        locationResult
                    }

                    return param
                })
                .catch(error => console.tron.error({ error }));
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
}