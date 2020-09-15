import { DropDownHolder } from '../Components'
import { PermissionsAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import IconIcon from 'react-native-vector-icons/Ionicons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Octicon from 'react-native-vector-icons/Octicons'
import _ from 'lodash'

export const ORDER_TYPE = {
  DESC: 'desc',
  ASC: 'asc',
}

export function compareValues(
  key,
  order = ORDER_TYPE.ASC,
  isDate = false,
  isTimeToken = false,
) {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    let varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    let varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    if (isDate) {
      varA = new Date(isTimeToken ? (varA / 1e4) : varA)
      varB = new Date(isTimeToken ? (varB / 1e4) : varB)
    }

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === ORDER_TYPE.DESC ? comparison * -1 : comparison;
  };
}

export function mergeAndReplace(
  oldArray = [],
  newArray,
  key = 'id',
  sortId,
  sortOrder,
  isDate = false,
) {
  const mergeArray = [...oldArray];
  newArray.forEach(newItem => {
    const index = mergeArray.findIndex(
      oldItem => oldItem[key] === newItem[key],
    );
    if (index >= 0) {
      mergeArray.splice(index, 1, newItem);
    } else {
      if (sortId) {
        if (mergeArray.length > 1) {
          if (
            mergeArray[0][sortId] < mergeArray[mergeArray.length - 1][sortId]
          ) {
            if (newItem[sortId] < mergeArray[0][sortId]) {
              mergeArray.unshift(newItem);
            } else {
              mergeArray.push(newItem);
            }
          } else {
            if (newItem[sortId] < mergeArray[0][sortId]) {
              mergeArray.push(newItem);
            } else {
              mergeArray.unshift(newItem);
            }
          }
        } else {
          mergeArray.push(newItem);
        }
      } else {
        if (mergeArray.length > 1) {
          if (mergeArray[0][key] < mergeArray[mergeArray.length - 1][key]) {
            if (newItem[key] < mergeArray[0][key]) {
              mergeArray.unshift(newItem);
            } else {
              mergeArray.push(newItem);
            }
          } else {
            if (newItem[key] < mergeArray[0][key]) {
              mergeArray.push(newItem);
            } else {
              mergeArray.unshift(newItem);
            }
          }
        } else {
          mergeArray.push(newItem);
        }
      }
    }
  });
  if (sortOrder && sortId) {
    mergeArray.sort(compareValues(sortId, sortOrder, isDate));
  }
  return mergeArray;
}

export function notAvailableFeature() {
  DropDownHolder.alert('error', 'Sorry, feature not available yet', 'Soon in next version')
}

export function getIconByType(type) {
  let Icon
  switch (type) {
    case 'ant-design': {
      Icon = AntDesign
      break
    }
    case 'entypo': {
      Icon = Entypo
      break
    }
    case 'evil-icons': {
      Icon = EvilIcon
      break
    }
    case 'feather': {
      Icon = Feather
      break
    }
    case 'font-awesome': {
      Icon = FontAwesome
      break
    }
    case 'font-awesome5': {
      Icon = FontAwesome5
      break
    }
    case 'fontisto': {
      Icon = Fontisto
      break
    }
    case 'foundation': {
      Icon = Foundation
      break
    }
    case 'ionicons': {
      Icon = IconIcon
      break
    }
    case 'material-community': {
      Icon = MaterialCommunity
      break
    }
    case 'material-icons': {
      Icon = MaterialIcon
      break
    }
    case 'octicons': {
      Icon = Octicon
      break
    }

    default: {
      Icon2 = FontAwesome5
      break
    }
  }

  return Icon
}

export function getSimpleCountryList(addFlag, addSection = false) {
  const COUNTRIES_CODE = _.sortBy(require('world-countries'), ['name.common'], ['asc']);
  let NEW_COUNTRY_CODE = []
  if (addFlag) {
    NEW_COUNTRY_CODE = COUNTRIES_CODE.map((item, index) => {
      return {
        id: index,
        name: item.name.common,
        nameWithFlag: `${item.flag} ${item.name.common}`,
        flag: item.flag,
        code: item.cca2,
        callingCode: item.callingCode ? item.callingCode[0] : null,
      }
    })
  } else {
    NEW_COUNTRY_CODE = COUNTRIES_CODE.map((item, index) => {
      return {
        id: index,
        name: item.name.common,
        code: item.cca2,
        callingCode: item.callingCode ? item.callingCode[0] : null,
      }
    })
  }

  if (addSection) {
    const TEMP_COUNTRIES_CODE = [...NEW_COUNTRY_CODE]

    NEW_COUNTRY_CODE = []
    let prevTitle = ''
    let newIndex = -1
    for (let i = 0; i < TEMP_COUNTRIES_CODE.length; i++) {
      const nextTitle = TEMP_COUNTRIES_CODE[i].name.charAt(0)
      if (prevTitle !== nextTitle) {
        newIndex += 1
        prevTitle = nextTitle
        NEW_COUNTRY_CODE[newIndex] = {
          title: nextTitle,
          data: [TEMP_COUNTRIES_CODE[i]]
        }
      } else {
        NEW_COUNTRY_CODE[newIndex].data.push(TEMP_COUNTRIES_CODE[i])
      }
    }
  }
  return NEW_COUNTRY_CODE
}

export function getMetaFromHeader(header) {
  try {
    return {
      page: parseInt(header.page, 10),
      total: parseInt(header.total, 10),
      limit: parseInt(header['per-page'], 10),
      last: parseInt(header.last, 10),
    };
  } catch (error) {
    return {
      page: null,
      total: null,
      limit: null,
      last: null,
    };
  }
}

export function requestAudioPermission() {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: "Whatsdoc Need permission to access microphone",
      message:
        "Microphone used to make a call with patient/doctor",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
}

export function requestCameraPermission() {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "Whatsdoc need permission to access camera",
      message:
        "Camera used to make a video call with patient/doctor",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  )
}

export const delay = (ms) => new Promise(res => setTimeout(res, ms))
