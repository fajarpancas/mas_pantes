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
import { Method } from 'react-native-awesome-component'

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
      rowIdOpen: '',
      noPenjualan: ''
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    const { getOrderProcessRequest, user } = this.props
    setTimeout(() => {
      const params = {
        page: 1,
        Kurir_Id: user.Id_Kurir
      }

      getOrderProcessRequest(params)
    }, 1000)
  }

  onCancel() {
    this.TimePicker.close();
  }

  confirmSubmit = () => {
    const { noPenjualan, estimasi, date } = this.state
    const { user, kirimBarangRequest } = this.props
    const param = {
      No_Penjualan: noPenjualan,
      Jam_Kirim: `${moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${estimasi}:00`,
      Kurir_Id: user.Id_Kurir
    }
    Method.LoadingHelper.showLoading()
    kirimBarangRequest(param)
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

  showModal = (noPenjualan) => {
    this.setState({ noPenjualan }, () => {
      this.estimasiModal.show()
    })
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
                <Text style={styles.textInfo}>{moment(item.Tgl_Penjualan, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')}</Text>
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
                    onPress={() => this.showModal(item.No_Penjualan)}>
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
    let name;

    if (user && user.Nama_User) {
      name = user.Nama_User
    }

    return (
      <View style={{ flex: 1 }}>

        <View style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 15,
          flexDirection: 'row',
          elevation: 1,
          marginBottom: 5
        }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icons name='person' size={20} color={Colors.textBlack} />
            <Text style={[styles.textInfoTotal, { marginLeft: 10 }]}>{name}</Text>
          </View>
          <Text style={[styles.textInfoTotal, { textAlign: 'right', flex: 1 }]}>Total Order Diambil: {this.props.listOrder.length}</Text>
        </View>

        <CustomFlatList
          data={this.props.listOrder}
          renderItem={this.renderList}
          refreshing={this.props.fetching}
          onRefresh={this.onRefresh}
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
  const listOrder = state.order.listOrderProcess
  const getOrder = state.order.getOrderProcess
  console.tron.error({ listOrder })
  return {
    listOrder,
    getOrder,
    user: state.session.userSession
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderProcessRequest: (params) => dispatch(OrdeActions.getOrderProcessRequest(params)),
    kirimBarangRequest: (params) => dispatch(OrdeActions.kirimBarangRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder)
