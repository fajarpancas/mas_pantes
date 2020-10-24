export const DEFAULT_COUNTRY_VALUE = __DEV__
    ? {
        id: 132,
        name: 'Malaysia',
        nameWithFlag: '🇲🇾 Malaysia',
        flag: '🇲🇾',
        code: 'MY',
        callingCode: '60',
    }
    : {
        id: 101,
        name: 'Indonesia',
        nameWithFlag: '🇮🇩 Indonesia',
        flag: '🇮🇩',
        code: 'ID',
        callingCode: '62',

    };

export const DEFAULT_STATE = {
    fetching: undefined,
    data: undefined,
    payload: undefined,
    error: undefined
}

export const API_KEY = 'AIzaSyAxFl6bFMkhCi_tCRjoSdOjBRj4a4fRKS0'