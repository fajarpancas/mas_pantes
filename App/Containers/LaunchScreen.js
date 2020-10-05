import React, { Component } from 'react'
import { StatusBar, Text, Image, View } from 'react-native'
import { Colors, Images } from '../Themes'
import styles from './Styles/LaunchScreenStyles'
import StartupActions from '../Redux/StartupRedux'
import { connect } from 'react-redux'

class LaunchScreen extends Component {

  componentDidMount() {
    this.props.startup()
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ccb102', justifyContent: 'center' }}>
        <StatusBar translucent={false} hidden={false} barStyle="dark-content" backgroundColor={Colors.goldBasic} />
        <Image source={Images.pantes} style={styles.logoPantes} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)