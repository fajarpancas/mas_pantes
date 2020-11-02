import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { ErrorContent } from '../../Components'
import { Fonts, Colors } from '../../Themes'
import styles from '../Styles/KebijakanPrivasiScreenStyle'

class KebijakanPrivasiScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Kebijakan Privasi',
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
      <View style={styles.container}>
        <ErrorContent
          title="Tidak ada data"
          message="Mohon maaf, data Kebijakan Privasi belum tersedia" />
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

export default connect(mapStateToProps, mapDispatchToProps)(KebijakanPrivasiScreen)
