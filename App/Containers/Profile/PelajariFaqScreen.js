import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { ErrorContent } from '../../Components'
import { Fonts, Colors } from '../../Themes'
import styles from '../Styles/PelajariFaqScreenStyle'

class PelajariFaqScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Pelajari FAQ',
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
          message="Mohon maaf, data Pelajari FAQ belum tersedia" />
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

export default connect(mapStateToProps, mapDispatchToProps)(PelajariFaqScreen)
