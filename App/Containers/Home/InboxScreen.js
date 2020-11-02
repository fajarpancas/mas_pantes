import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import styles from '../Styles/InboxScreenStyle'
import { Fonts, Colors } from '../../Themes'

class InboxScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Inbox',
    headerTitleStyle: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.type.acuminProSemiBold,
      textTransform: 'uppercase',
    },
    headerStyle: {
      backgroundColor: '#ccb102',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  })

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>Belum ada inbox</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen)
