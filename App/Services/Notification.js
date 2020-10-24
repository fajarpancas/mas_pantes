import { Platform, PushNotificationIOS, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'react-native-firebase'
import { DropDownHolder } from '../Components'
import { connect } from 'react-redux'
import { getLocation } from './Location'
import NavigationServices from '../Services/NavigationServices'
import InboxAction from '../Redux/InboxRedux'
import TrackingAction from '../Redux/TrackingRedux'
import SessionAction from '../Redux/SessionRedux'

const OS = Platform.OS

const displayNotification = (notification) => {
  console.tron.log('displayNotification ', notification, notification.data, notification.body)
  try {
    const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
    })
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.body)
      .setBody(notification.body)
      .setData(notification.data)
      .setSound("default")
      .android.setDefaults()
      .android.setVisibility(firebase.notifications.Android.Visibility.Public)
      .android.setChannelId('test-channel')
      .android.setSmallIcon('ic_launcher')
      .android.setVibrate([300])
      .android.setPriority(firebase.notifications.Android.Importance.High)

    firebase
      .notifications()
      .displayNotification(localNotification)
  } catch (error) {
    console.tron.error({ err: error.message })
  }
}

export function clearNotification() {
  firebase.notifications().removeAllDeliveredNotifications()
}

function notificationListener(props) {
  firebase.messaging().getToken().then(fcmToken => {
    console.tron.warn('fcmToken.getToken ', fcmToken)
    console.tron.log('fcmToken ', fcmToken)
    AsyncStorage.setItem('fcmToken', fcmToken)
    props.saveFcmToken(fcmToken)
  }).catch(err => {
    console.tron.log('fcmToken.err ', err.message)
    props.saveFcmToken('FCM TOKEN FAILED')
  })

  firebase.notifications().onNotification((notification) => {
    console.tron.log('onNotification 23', notification)
    const { android, data } = notification
    const { clickAction } = android
    const { actions } = data
    try {
      if (clickAction === 'get_lokasi') {
        DropDownHolder.alert('info', `${notification.title}`, `${notification.body}`)
        props.saveSalesId(JSON.parse(actions))
        props.tracking()
      }

      if (clickAction === 'info_lokasi') {
        props.saveTrackingLokasi(JSON.parse(actions))
        props.setTrackingFinish()
        NavigationServices.navigate("KurirLocationTracking")
      }

      displayNotification(notification)
    } catch (err) {
      console.tron.log('onNotification.ERROR ', err.message)
    }
  })

  firebase.notifications().onNotificationOpened(({ notification }) => {
    console.tron.display({
      name: 'FCM_NOTIFICATION', preview: 'On Notification Open',
      value: notification,
      important: true
    })
    try {
      console.tron.log('onNotificationOpen ', notification.data)
      // props.setActionInbox(notification.data)
      clearNotification()
    } catch (err) {
      console.tron.error('FCM_NOTIFICATION.onOpen')
      console.tron.log('err FCM_NOTIFICATION.onOpen', err.message)
    }
  })

  firebase.notifications().getInitialNotification().then(({ notification }) => {
    // props.addInbox([notification._data])
    console.tron.display({
      name: 'FCM_NOTIFICATION', preview: 'On Notification Open',
      value: notification,
      important: true
    })
    try {
      console.tron.log('getInitialNotification ', notification.data)
      // props.setActionInbox(notification.data)
      clearNotification()
    } catch (err) {
      console.tron.error('FCM_NOTIFICATION.onOpenBackground')
      console.tron.log('err FCM_NOTIFICATION.onOpenBackground', err.message)
    }
  })
}


function fcmNotification(props) {
  console.tron.log('fcmNotification ', props)
  firebase.messaging().hasPermission().then(enabled => {
    console.tron.log('hasPermission ', enabled, OS)
    if (enabled) {
      notificationListener(props)
    }
    // else if(OS == 'ios'){
    //   PushNotificationIOS.requestPermission().then( rejected => {
    //     console.tron.log('requestPermission ios', rejected)
    //     notificationListener(props)
    //   })
    // }
    else {
      firebase.messaging().requestPermission().then(rejected => {
        console.tron.log('requestPermission ', rejected)
        notificationListener(props)
      })
      props.saveFcmToken('NOT PERMITTED')
    }
  }).catch(err => {
    console.tron.log('not permission ', err, err.message)
    // props.registerDevice('NOT PERMITTED')
  })
  return null
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    saveFcmToken: deviceToken => dispatch(InboxAction.saveFcmToken(deviceToken)),
    setTrackingFinish: () => dispatch(TrackingAction.setTrackingFinish()),
    tracking: () => dispatch(TrackingAction.trackingRequest()),
    saveSalesId: (data) => dispatch(SessionAction.saveSalesId(data)),
    saveTrackingLokasi: (data) => dispatch(TrackingAction.saveTrackingLokasi(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(fcmNotification)

/*
Notification Format
{
  "priority": "high",
  "content_available": true,
  "show_in_foreground": true,
  "notification": {
    "title":"Thank You for Signing Up",
    "body": "(notif.body.notif) Thank you for signing up a self-check account with RAM Credit Information Sdn Bhd ('RAMCI')"
  },
  "data": {
    "messageID":32,
    "title":"Thank You for Signing Up",
    "notification":"(data.notif.notif) Thank you for signing up a self-check account with RAM Credit Information Sdn Bhd ('RAMCI')"
  },
}
*/
