import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import EstimasiModal from '../../Components/EstimasiModal'
import { DropDownHolder } from '../../Components'
import styles from '../Styles/ListOrderScreenStyle'
import DatePicker from 'react-native-date-picker';
import Scale from '../../Transforms/Scale';
import TimePicker from "react-native-24h-timepicker"
import { Colors, Images } from '../../Themes'
import moment from 'moment-timezone';
import Modal from 'react-native-modal'
import ListOrder from './ListOrder'

class AvailOrderScreen extends Component {
  estimasiModal = undefined
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.state = {
      estimasi: moment(new Date()).format('HH:mm'),
      ambil: false,
      date: moment(new Date()).format('DD/MM/YYYY'),
      initialDate: undefined,
      dateFormat: 'DD/MM/YYYY',
      locale: 'en-GB',
      mode: 'date',
      modalDate: false
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

  setValueDate = (value) => {
    this.setState({ date: value })
  }

  hideShowDatePicker = () => {
    this.setState({ modalDate: !this.state.modalDate })
  }

  renderDatePicker = () => {
    return (
      <Modal
        isVisible={this.state.modalDate}
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => {
          this.hideShowDatePicker()
        }}
        onBackdropPress={() => {
          this.hideShowDatePicker()
        }}
        style={{
          justifyContent: 'flex-end',
          alignContent: 'center',
          alignItems: 'center',
          margin: 0,
          width: '100%',
          padding: 0
        }}>

        <DatePicker
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignSelf: 'center',
            width: Scale(375),
          }}
          // initialDate={moment.tz(this.state.initialDate, 'UTC').toDate()}
          onDateChange={(date) => { this.setValueDate(date) }}
          maximumDate={undefined}
          date={
            this.state.date
              ? moment.tz(this.state.date, this.state.dateFormat, 'UTC').toDate()
              : moment.tz(undefined, 'UTC').toDate()
          }
          minimumDate={undefined}
          mode={this.state.mode}
          locale={this.state.locale}
          timeZoneOffsetInMinutes={0}
        />
      </Modal>
    )
  }

  ambilAction = () => {
    this.setState({ ambil: !this.state.ambil })
  }

  renderTimeslot = (value) => {
    const { date } = this.state
    return (
      <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <TouchableOpacity style={[styles.containerTimeslot, { marginRight: 10 }]} onPress={this.hideShowDatePicker}>
          <Text style={styles.tglJam}>Tanggal</Text>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={styles.time}>{moment(date, 'DD/MM/YYYY').format('DD MMM YYYY')}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Image source={Images.iconDropdown} style={styles.chevronRight} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.containerTimeslot, { marginLeft: 10 }]} onPress={() => this.TimePicker.open()}>
          <Text style={styles.tglJam}>Jam</Text>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={styles.time}>{value}</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Image source={Images.iconDropdown} style={styles.chevronRight} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <ListOrder />
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.userSession
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailOrderScreen)
