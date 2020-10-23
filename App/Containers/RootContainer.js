import React, { Component } from 'react'
import { View, StatusBar, Text, ActivityIndicator } from 'react-native'
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
import FCMNotification from '../Services/Notification'
import { getTrackingRequest } from '../Lib/TrackingHelper'
import Modal from 'react-native-modal'
import Icons from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'
import Scale from '../Transforms/Scale'
import TrackingAction from '../Redux/TrackingRedux'

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <FCMNotification />
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
    trackingRequest: state.tracking.trackingRequest
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  setTrackingFinish: () => dispatch(TrackingAction.setTrackingFinish()),
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
