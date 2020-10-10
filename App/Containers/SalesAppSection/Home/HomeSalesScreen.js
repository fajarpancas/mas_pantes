import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../../Styles/ListOrderScreenStyle'
import OrderActions from '../../../Redux/OrderRedux'
import HeaderMasPantes from '../../../Components/HeaderMasPantes'
import { CustomFlatList } from '../../../Components'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../../Themes'
import moment from 'moment'

class HomeSalesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    const { getSalesListOrderRequest, user } = this.props
    if (user) {
      const params = {
        page: 1,
        Id_Sales: user.Id_Sales
      }

      getSalesListOrderRequest(params)
    }
  }

  kurirSetor = (item) => {
    const { kurirSetorRequest, user } = this.props
    const param = {
      Id_Sales: user.Id_Sales,
      No_Penjualan: item.No_Penjualan,
      Jam_Setor: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    }
    kurirSetorRequest(param)
  }

  renderStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <Text style={styles.menungguOrder}>Menunggu di pick oleh kurir</Text>
        );
      case 1:
        return (
          <Text style={styles.menungguOrder}>Orderan telah di pick oleh kurir</Text>
        );
      case 2:
        return (
          <Text style={styles.menungguOrder}>Orderan dalam proses pengiriman</Text>
        );
      case 3:
        return (
          <Text style={styles.finishOrder}>Orderan telah diterima oleh customer</Text>
        );
    }
  }

  renderList = ({ item, index }) => {
    let status = 0

    if (item.Kurir_Id) {
      status = 1
    }

    if (item.Jam_Kirim) {
      status = 2
    }

    if (item.Jam_Terima) {
      status = 3
    }

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
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Icons name="place" size={25} color={'red'} style={{ marginRight: 10 }} />
                <Text style={styles.textInfoAlamat}>{item.Alamat}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 5 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DetailScreen', { data: { ...item, viewOnly: true } })}>
                <Icons name="info" color={'#00b9f2'} size={30} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Detail</Text>
            </View>
          </View>
          <Text style={styles.statusText}>Status Orderan:</Text>
          {this.renderStatus(status)}

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flexDirection: 'column', marginTop: 13, flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.pembayaranTitle}>Jenis Pembayaran:</Text>
                <Text style={styles.pembayaran}>{item.Id_Jenis_Pembayaran === 1 ? 'Tunai/COD' : 'Transfer'}</Text>
              </View>
              {item.Id_Jenis_Pembayaran === 1 &&
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.pembayaranTitle}>Status Pembayaran:</Text>
                  {item.Status === 0 ?
                    <Text style={styles.pembayaran}>Belum disetorkan</Text> :
                    <Text style={styles.pembayaran}>Sudah disetorkan</Text>}
                </View>}
            </View>
            {item.Id_Jenis_Pembayaran === 1 && status === 3 &&
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                  disabled={item.Status === 1}
                  onPress={() => this.kurirSetor(item)}>
                  <Icons name="check-box" color={item.Status === 0 ? Colors.warm_grey : Colors.alertSuccess} size={30} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                {item.Status === 0 ?
                  <Text style={styles.textSetor}>Tandai sudah menyetor</Text>
                  : <Text style={styles.textSetorSuccess}>Sudah disetorkan</Text>
                }
              </View>}
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { user, salesListOrder, getSalesListOrder } = this.props
    let name;

    if (user && user.Nama_User) {
      name = user.Nama_User
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HeaderMasPantes />

          <Text style={styles.namaKurir}>Total Orderan yang telah dibuat: {salesListOrder.length}</Text>
          <CustomFlatList
            data={salesListOrder}
            renderItem={this.renderList.bind(this)}
            refreshing={getSalesListOrder.fetching}
            onRefresh={this.onRefresh}
            error={false}
            errorMessage={'Tidak ada data order'}
            emptyTitle={'Data Order Kosong'}
            emptyMessage={'Belum ada order yang dibuat'}
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
    getSalesListOrder: state.order.getSalesListOrder,
    salesListOrder: state.order.salesListOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    kurirSetorRequest: (param) => dispatch(OrderActions.kurirSetorRequest(param)),
    getSalesListOrderRequest: (param) => dispatch(OrderActions.getSalesListOrderRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSalesScreen)
