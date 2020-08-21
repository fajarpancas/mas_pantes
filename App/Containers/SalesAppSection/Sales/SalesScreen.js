import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import BarcodeScannerScreen from './BarcodeScanner'
import { Colors, Fonts } from '../../../Themes'

class SalesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Laporan',
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

  constructor(props) {
    super(props)
    this.state = {
      barcodeOpen: false,
      dataBarcode: 'No data barcode'
    }
  }

  openCloseBarcode = () => {
    this.setState({ barcodeOpen: !this.state.barcodeOpen })
  }

  setData = (value) => {
    this.setState({ dataBarcode: value })
  }

  render() {
    const { barcodeOpen } = this.state
    return (
      <View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.white }}>
        {barcodeOpen ?
          <BarcodeScannerScreen closeScanner={this.openCloseBarcode} dataScanner={(value) => this.setData(value)} />
          :
          <View>
            <TouchableOpacity onPress={this.openCloseBarcode}>
              <Text style={{ alignSelf: 'center' }}>SCAN</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center' }}>{this.state.dataBarcode}</Text>
          </View>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen)
