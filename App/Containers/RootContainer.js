import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
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

// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'

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
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
