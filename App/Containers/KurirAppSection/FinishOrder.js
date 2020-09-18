import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import styles from '../Styles/ListOrderScreenStyle'
import { Colors } from '../../Themes'

class FinishOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* <HeaderMasPantes /> */}

          <Text style={styles.namaKurir}>Nama Kurir: Akmal</Text>

          <View style={{ flex: 1 }}>
            <View style={styles.listOrderWrapper}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[{ flex: 1 }, styles.textInfo]}>No order</Text>
                <Text style={styles.textInfo}>Tgl order</Text>
              </View>
              <Text style={styles.textInfo}>Nama</Text>
              <Text style={styles.textInfo}>Alamat</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[{ flex: 1 }, styles.textInfo]}>Telepon</Text>
                <TouchableOpacity style={styles.detailButton} onPress={() => this.props.navigation.navigate('DetailScreen')}>
                  <Text style={styles.detailText}>
                    Detail
                 </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{
            paddingVertical: 15,
            paddingHorizontal: 15,
            backgroundColor: Colors.white
          }}>
            <Text style={styles.textInfo}>Total Order :</Text>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <Text style={[{ flex: 1 }, styles.textInfo]}>Jumlah Order</Text>
              <Text style={styles.textInfo}>Nilai Order</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[{ flex: 1 }, styles.textInfo]}>Jumlah Terima</Text>
              <Text style={styles.textInfo}>Nilai Terima</Text>
            </View>

          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FinishOrderScreen)
