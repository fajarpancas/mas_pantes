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
import OrdeActions from '../../Redux/OrderRedux'
import { CustomFlatList } from '../../Components'
import Icons from 'react-native-vector-icons/MaterialIcons'

class ListOrder extends Component {
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
      modalDate: false,
      rowIdOpen: ''
    }
  }

  componentDidMount() {
    const { getOrderRequest } = this.props
    getOrderRequest()
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

  ambilAction = (id) => {
    this.setState({ rowIdOpen: id })
  }

  batalAction = () => {
    this.setState({ rowIdOpen: '' })
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

  renderList = ({ item, index }) => {
    return (
      <View>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.listOrderWrapper}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[{ flex: 1 }, styles.textInfo]}>{item.No_Penjualan}</Text>
                <Text style={styles.textInfo}>{item.Tgl_Penjualan}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <Text style={styles.textName}>{item.Nama_Customer}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Icons name="place" size={25} color={'red'} style={{ marginRight: 10 }} />
                    <Text style={styles.textInfoAlamat}>{item.Alamat}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={item.Row_Id === this.state.rowIdOpen ? styles.cancelButton : styles.ambilButton}
                    onPress={() => item.Row_Id === this.state.rowIdOpen ? this.batalAction() : this.ambilAction(item.Row_Id)}>
                    <Icons
                      name={item.Row_Id === this.state.rowIdOpen ? 'close' : 'near-me'}
                      color={item.Row_Id === this.state.rowIdOpen ? 'red' : '#00b9f2'}
                      size={30}
                      style={{ alignSelf: 'center' }} />
                  </TouchableOpacity>
                  <Text style={item.Row_Id === this.state.rowIdOpen ? styles.textBatal : styles.textKirim}>
                    {item.Row_Id === this.state.rowIdOpen ? 'Batal' : 'Kirim'}</Text>
                </View>
              </View>
              {
                item.Row_Id == this.state.rowIdOpen &&
                <View style={styles.estimasiWrapper}>
                  <View style={{ flex: 1, marginTop: 10, justifyContent: 'center' }}>
                    <Text style={styles.textEstimasi}>Estimasi Barang Sampai</Text>
                  </View>
                  {this.renderTimeslot(this.state.estimasi)}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.estimasiModal.show()}>
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { user } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.namaKurir}>Nama Kurir: {user && user.Nama_User ? user.Nama_User : ''}</Text>
        <CustomFlatList
          data={this.props.listOrder}
          renderItem={this.renderList}
          refreshing={this.props.fetching}
          onRefresh={() => this.props.getOrderRequest()}
          error={false}
          errorMessage={'Tidak ada data order'}
          onEndReached={() => { }}
        />

        <EstimasiModal
          submitText='Ya, Lanjutkan'
          time={this.state.estimasi}
          tanggal={this.state.date}
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
        {this.renderDatePicker()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const listOrder = state.order.listOrder
  const getOrder = state.order.getOrder
  console.tron.error({ listOrder })
  return {
    listOrder,
    getOrder,
    user: state.session.userSession
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderRequest: () => dispatch(OrdeActions.getOrderRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder)
