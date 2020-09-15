import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import styles from '../Styles/HomeKurirScreenStyle'

class HomeKurirScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderMasPantes />
        <Text>HomeKurirScreen</Text>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeKurirScreen)
