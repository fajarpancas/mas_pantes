import React, { Component } from 'react'
import { View, StatusBar, Text, ActivityIndicator, AppState } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import InAppPopUp from '../Components/InAppPopUp'
import {
  ConnectionHandler,
  CustomAlert,
  LoadingModal,
  Method,
} from 'react-native-awesome-component';
import { getTrackingRequest } from '../Lib/TrackingHelper'
import Modal from 'react-native-modal'
import Icons from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'
import Scale from '../Transforms/Scale'
import TrackingAction from '../Redux/TrackingRedux'
import BackgroundService from 'react-native-background-actions';
import SessionAction from '../Redux/SessionRedux'
import InboxAction from '../Redux/InboxRedux'
import OrderAction from '../Redux/OrderRedux'
import { fcmService } from '../Services/FCMService';
import { localNotificationService } from '../Services/LocalNotificationService';
import NavigationServices from '../Services/NavigationServices'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionData: undefined
    }

    this.currentState = AppState.currentState;
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  finelocationCheckPermission = (id) => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            this.finelocationRequestPermission(id);
            break;
          case RESULTS.GRANTED:
            console.tron.error('fine acc')
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.tron.error({ err: error.message })
      });
  };

  finelocationRequestPermission = (id) => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            DropDownHolder.alert('error', 'Izin tracking lokasi ditolak', 'terima izin tracking lokasi agar sales dapat mengetahui posisi anda')
            break;
          case RESULTS.GRANTED:
            console.tron.error('fine acc')
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.tron.error({ err: error.message })
      });
  };

  backgroundlocationCheckPermission = (id) => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            this.backgroundlocationRequestPermission(id);
            break;
          case RESULTS.GRANTED:
            console.tron.error('bg acc')
            this.finelocationCheckPermission(id);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.tron.error({ err: error.message })
      });
  };

  backgroundlocationRequestPermission = (id) => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            DropDownHolder.alert('error', 'Izin tracking lokasi ditolak', 'terima izin tracking lokasi agar sales dapat mengetahui posisi anda')
            break;
          case RESULTS.GRANTED:
            console.tron.error('bg acc')
            this.finelocationCheckPermission(id);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.tron.error({ err: error.message })
      });
  };

  handleAppStateChange(nextAppState) {
    const {
      changeStatusKurirRequest,
      user
    } = this.props;

    if (
      this.currentState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (user && user.Id_Role === 2) {
        const { Id_Kurir } = user
        const param = {
          Kurir_Id: Id_Kurir,
          Status_Active: 1
        }
        changeStatusKurirRequest(param)
      }
    }

    if (
      this.currentState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      if (user && user.Id_Role === 2) {
        const { Id_Kurir } = user
        const param = {
          Kurir_Id: Id_Kurir,
          Status_Active: 0
        }
        changeStatusKurirRequest(param)
      }
    }

    this.currentState = nextAppState;
  }

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    console.tron.error({ this: this.props.user })

    this.backgroundlocationCheckPermission()
    this.FCMInit()
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  FCMInit = () => {
    // fcmService.registerAppWithFCM();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
      this.onGetLocation,
      this.onGetInfoKurir
    );
    localNotificationService.configure(this.onOpenNotification);
  }

  onRegister = token => {
    const { saveFcmToken } = this.props;
    saveFcmToken(token);
    console.tron.log('[NotificationFCM] onRegister: ', token);
  };

  onGetLocation = (payload) => {
    const { user } = this.props
    const { data } = payload
    const { Click_Action } = data
    console.tron.error({ payload })

    if (Click_Action === 'get_lokasi') {
      const { No_Penjualan, Id_Sales } = data
      const keterangan = {
        No_Penjualan,
        Id_Sales
      }
      console.tron.error({ keterangan })
      this.props.saveSalesId(keterangan)
      this.props.tracking()
    }

    if (Click_Action === 'info_lokasi') {
      const { No_Penjualan, Keterangan } = data

      const param = {
        No_Penjualan,
        Keterangan: JSON.parse(Keterangan)
      }

      this.props.saveTrackingLokasi(param)
      this.props.setTrackingFinish()
      NavigationServices.navigate("KurirLocationTracking")
      console.log('mendapat lokasi')
    }
  }

  onGetInfoKurir = (payload, autoNav) => {
    const { user, getSalesListOrderRequest } = this.props
    const { data } = payload
    const { Click_Action } = data

    console.log('manggil')
    if (Click_Action === 'info_kurir') {
      if (user.Id_Role === 1) {
        const param = {
          Id_Sales: user.Id_Sales,
          page: 1
        }
        if (autoNav) {
          NavigationServices.navigate('HomeSales')
        }
        getSalesListOrderRequest(param)
      }
    }
  }

  onNotification(notify) {
    const options = {
      soundName: 'default',
      playSound: true,
    };
    localNotificationService.showNotificaiton(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  }

  onOpenNotification(notify) {
    // this.onGetLocation(notify)
    console.tron.log('[NotificationFCM] onOpenNotification: ', notify);
    console.log('[NotificationFCM] onOpenNotification: ', notify);
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <InAppPopUp />
        <LoadingModal
          size={'large'}
          color={Colors.goldBasic}
          ref={(r) => Method.LoadingHelper.setLoadingInstance(r)}
        />
        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          onBackButtonPress={this.props.setTrackingFinish}
          isVisible={this.props.trackingRequest}>
          <View style={styles.wrapper}>
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator
                color={'red'}
                size={Scale(150)}
                style={{ position: 'absolute' }} />
              <Icons name="person-pin-circle" size={Scale(70)} color={'red'} style={{ marginTop: Scale(40) }} />
            </View>
            <Text style={styles.textGetLokasi}>Mencari Lokasi Kurir Saat Ini...</Text>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trackingRequest: state.tracking.trackingRequest,
    user: state.session.userSession
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  saveSalesId: (data) => dispatch(SessionAction.saveSalesId(data)),
  setTrackingFinish: () => dispatch(TrackingAction.setTrackingFinish()),
  changeStatusKurirRequest: (param) => dispatch(TrackingAction.changeStatusKurirRequest(param)),
  tracking: () => dispatch(TrackingAction.trackingRequest()),
  saveFcmToken: deviceToken => dispatch(InboxAction.saveFcmToken(deviceToken)),
  saveTrackingLokasi: (data) => dispatch(TrackingAction.saveTrackingLokasi(data)),
  startup: () => dispatch(StartupActions.startup()),
  getSalesListOrderRequest: (param) => dispatch(OrderAction.getSalesListOrderRequest(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
