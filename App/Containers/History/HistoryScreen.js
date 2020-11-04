import React, { Component } from 'react'
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../Styles/HistoryScreenStyle'
import { Fonts, Colors } from '../../Themes'
import OrderAction from '../../Redux/OrderRedux'
import { CustomFlatList } from '../../Components'
import Scale from '../../Transforms/Scale'
import moment from 'moment'

class HistoryScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Riwayat',
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
      latitude: 0,
      longitude: 0,
      error: null,
      Address: null
    }
  }

  componentDidMount() {
    console.tron.error('get')
    this.onRefresh()
  }

  onRefresh = () => {
    const { getListHistoryRequest, user } = this.props
    const { Id_User } = user
    const param = {
      User_Id: Id_User,
      page: 1
    }
    getListHistoryRequest(param)
  }

  renderList = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
        <View style={styles.listOrderWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[{ flex: 1 }, styles.textInfo]}>{item.No_Penjualan}</Text>
            <Text style={styles.textInfo}>{moment(item.Tgl_Penjualan, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.textName}>{item.Nama_Customer}</Text>
              {/* <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={[styles.pembayaranTitle, { lineHeight: 17 }]}>Keterangan:</Text>
                <Text style={[styles.pembayaran, { width: Scale(195), lineHeight: 17 }]}>{item.Keterangan ? item.Keterangan : "-"}</Text>
              </View> */}
              <Text style={styles.textInfoAlamat}>Nilai Bayar: {item.Nilai_Bayar}</Text>
              <Text style={styles.textInfoAlamat}>Ongkos Kirim: {item.Ongkos_Kirim}</Text>
              {!item.Jam_Kirim && !item.Jam_Terima &&
                <View style={{ marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={[styles.textInfoKirim, { color: 'red' }]}>Orderan pending, masih menunggu kurir</Text>
                    <Icons name="timer" color={'red'} size={20} style={{ alignSelf: 'center' }} />
                  </View>
                  <Text style={styles.textInfoAlamat}>Jam Kemas: {moment(item.Jam_Kemas, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')}</Text>
                </View>}
              {item.Jam_Kirim && !item.Jam_Terima &&
                <View style={{ marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={[styles.textInfoKirim, { color: '#00b9f2' }]}>Orderan sedang dalam pengiriman</Text>
                    <Icons name="directions-bike" color={'#00b9f2'} size={20} style={{ alignSelf: 'center' }} />
                  </View>
                  <Text style={styles.textInfoAlamat}>Jam Kirim: {moment(item.Jam_Kirim, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')}</Text>
                </View>}
              {item.Jam_Terima &&
                <View style={{ marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={[styles.textInfoKirim, { color: 'green' }]}>Orderan sudah diterima</Text>
                    <Icons name="check" color={'green'} size={20} style={{ alignSelf: 'center' }} />
                  </View>
                  <Text style={styles.textInfoAlamat}>Jam Terima: {moment(item.Jam_Terima, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')}</Text>
                </View>}
            </View>
            {/* <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity style={styles.detailButton} onPress={() => this.ambilBarang(item.No_Penjualan)}>
                <Icons name="add" color={'#00b9f2'} size={30} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Ambil</Text>
            </View> */}
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { listHistory, getListHistory } = this.props
    return (
      <View style={{ flex: 1, paddingTop: 15, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <CustomFlatList
          data={listHistory}
          renderItem={this.renderList.bind(this)}
          refreshing={getListHistory.fetching}
          onRefresh={this.onRefresh}
          error={false}
          emptyTitle='Tidak ada data'
          emptyMessage='Belum ada orderan yang tersedia'
          errorMessage={'Tidak ada data order'}
          onEndReached={() => { }}
        />
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    getListHistory: state.order.getListHistory,
    listHistory: state.order.listHistory,
    user: state.session.userSession
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListHistoryRequest: (param) => dispatch(OrderAction.getListHistoryRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
