import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ListOrder from './ListOrder'
import { CustomFlatList } from '../../Components'
import OrderActions from '../../Redux/OrderRedux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../Styles/ListOrderScreenStyle'
import { Method } from 'react-native-awesome-component'
import moment from 'moment'
import { Colors } from '../../Themes'
import Scale from '../../Transforms/Scale'

class AvailOrderScreen extends Component {
  estimasiModal = undefined
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    const { getOrderRequest } = this.props
    const param = {
      page: 1
    }
    getOrderRequest(param)
  }

  ambilBarang = (noPenjualan) => {
    const { user, pickBarangRequest } = this.props
    const param = {
      No_Penjualan: noPenjualan,
      Kurir_Id: user.Id_Kurir
    }
    Method.LoadingHelper.showLoading()
    pickBarangRequest(param)
  }

  renderList = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
        <View style={styles.listOrderWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[{ flex: 1 }, styles.textInfo]}>{item.No_Penjualan}</Text>
            <Text style={styles.textInfo}>{moment(item.Tgl_Penjualan, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.textName}>{item.Nama_Customer}</Text>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={[styles.pembayaranTitle, { lineHeight: 17 }]}>Keterangan:</Text>
                <Text style={[styles.pembayaran, { width: Scale(195), lineHeight: 17 }]}>{item.Keterangan ? item.Keterangan : "-"}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Icons name="place" size={25} color={'red'} style={{ marginRight: 10 }} />
                <Text style={styles.textInfoAlamat}>{item.Alamat}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity style={styles.detailButton} onPress={() => this.ambilBarang(item.No_Penjualan)}>
                <Icons name="add" color={'#00b9f2'} size={30} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Ambil</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { user, listOrder, getOrder } = this.props
    let name;

    if (user && user.Nama_User) {
      name = user.Nama_User
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <View style={{ flex: 1 }}>
          {/* <HeaderMasPantes /> */}

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
            <Text style={[styles.textInfoTotal, { textAlign: 'right', flex: 1 }]}>Total Order Tersedia: {listOrder.length}</Text>
          </View>

          <CustomFlatList
            data={listOrder}
            renderItem={this.renderList.bind(this)}
            refreshing={getOrder.fetching}
            onRefresh={this.onRefresh}
            error={false}
            emptyTitle='Tidak ada data'
            emptyMessage='Belum ada orderan yang tersedia'
            errorMessage={'Tidak ada data order'}
            onEndReached={() => { }}
          />

        </View>
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.userSession,
    getOrder: state.order.getOrder,
    listOrder: state.order.listOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderRequest: (param) => dispatch(OrderActions.getOrderRequest(param)),
    pickBarangRequest: (param) => dispatch(OrderActions.pickBarangRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailOrderScreen)
