import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import EstimasiModal from '../../Components/EstimasiModal'
import { DropDownHolder } from '../../Components'
import styles from '../Styles/ListOrderScreenStyle'
import TimePicker from "react-native-24h-timepicker"
import { Colors, Images } from '../../Themes'
import moment from 'moment'

class AvailOrderScreen extends Component {
  estimasiModal = undefined
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.state = {
      estimasi: moment(new Date()).format('HH:mm'),
      ambil: false
    }
  }

  onCancel() {
    this.TimePicker.close();
  }

  confirmSubmit = () => {
    this.ambilAction()
    DropDownHolder.alert('success', 'Order berhasil diambil', 'Cek orderan yang telah diambil pada proses')
  }

  onConfirm(hour, minute) {
    this.TimePicker.close()
    this.setState({ estimasi: `${hour}:${minute}` })
  }

  ambilAction = () => {
    this.setState({ ambil: !this.state.ambil })
  }

  renderTimeslot = (title, value) => {
    return (
      <TouchableOpacity style={styles.containerTimeslot} onPress={() => this.TimePicker.open()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.time}>{value}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Image source={Images.iconDropdown} style={styles.chevronRight} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
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
                <TouchableOpacity style={this.state.ambil ? styles.cancelButton : styles.ambilButton} onPress={this.ambilAction}>
                  <Text style={styles.ambilText}>
                    {this.state.ambil ? 'Batal' : 'Ambil'}
                  </Text>
                </TouchableOpacity>
              </View>
              {
                this.state.ambil &&
                <View style={styles.estimasiWrapper}>
                  {this.renderTimeslot('Estimasi Barang Sampai :', this.state.estimasi)}
                  <TouchableOpacity style={styles.submitButton} onPress={() => this.estimasiModal.show()}>
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
        <EstimasiModal
          submitText='Ya, Lanjutkan'
          title={this.state.estimasi}
          onConfirm={() => this.confirmSubmit()}
          setRef={r => this.estimasiModal = r}
        />
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
      </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(AvailOrderScreen)
