import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../../Styles/ListOrderScreenStyle'
import OrderActions from '../../../Redux/OrderRedux'
import HeaderMasPantes from '../../../Components/HeaderMasPantes'
import { CustomFlatList, DropDownHolder } from '../../../Components'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../../Themes'
import moment from 'moment'
import { Method } from 'react-native-awesome-component';
import TrackingActions from '../../../Redux/TrackingRedux'
import Scale from '../../../Transforms/Scale'
import Modal from 'react-native-modal'

class HomeSalesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })

  constructor(props) {
    super(props)
    this.state = {
      openList: [],
      itemStor: undefined,
      itemBatal: undefined,
      itemClose: undefined,
      storModal: false,
      batalModal: false,
      closeOrderModal: false,
      idKurir: '',
      confirmTrackingModal: false
    }
  }

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
    this.setState({ storModal: false }, () => {
      Method.LoadingHelper.showLoading()
    })
  }

  cekStatusKurir = (id, statusKurir) => {
    this.setState({ idKurir: id }, () => {
      if (statusKurir) {
        this.getLokasi(true)
      } else {
        this.confirmTrackingOn()
      }
    })
  }

  confirmTrackingOn = () => {
    this.setState({ confirmTrackingModal: !this.state.confirmTrackingModal })
  }

  getLokasi = (statusKurir) => {
    const { user, getLokasiKurirRequest, setTrackingRequest } = this.props
    if (this.state.idKurir) {
      const param = {
        Id_Kurir: this.state.idKurir,
        Id_Sales: user.Id_Sales,
        Nama_User: user.Nama_User,
        No_Penjualan: ''
      }

      getLokasiKurirRequest(param)
      if (statusKurir) {
        setTrackingRequest()
      } else {
        this.setState({ confirmTrackingModal: !this.state.confirmTrackingModal })
        Method.LoadingHelper.showLoading()
        setTimeout(() => {
          Method.LoadingHelper.hideLoading()
          DropDownHolder.alert('info', 'Tracking kurir', 'Berhasil mengirim tracking kurir, tunggu hingga kurir membuka aplikasi')
        }, 1000)
      }
    } else {
      Method.LoadingHelper.showLoading()
      setTimeout(() => {
        Method.LoadingHelper.hideLoading()
        DropDownHolder.alert('error', 'Gagal tracking kurir', 'Tidak ditemukan Kurir_Id pada API response')
      }, 1000)
    }
  }

  storModalState = () => {
    this.setState({ storModal: !this.state.storModal })
  }

  popUpConfirmSetor = (item) => {
    this.setState({ itemStor: item }, () => {
      this.storModalState()
    })
  }

  batalModalState = () => {
    this.setState({ batalModal: !this.state.batalModal })
  }

  batalkanOrderan = (item) => {
    this.setState({ itemBatal: item }, () => {
      this.batalModalState()
    })
  }

  closeOrderan = (item) => {
    this.setState({ itemClose: item }, () => {
      this.closeOrderModalState()
    })
  }

  closeOrderModalState = () => {
    this.setState({ closeOrderModal: !this.state.closeOrderModal })
  }

  onSubmitBatalOrder = (item) => {
    const { No_Penjualan } = item
    const { cancelOrderRequest, user } = this.props
    this.setState({ batalModal: false }, () => {
      const param = {
        Id_Sales: user.Id_Sales,
        No_Penjualan
      }

      Method.LoadingHelper.showLoading()
      cancelOrderRequest(param)
    })
  }

  onArsipOrder = (item) => {
    const { No_Penjualan } = item
    const { closeOrderRequest, user } = this.props
    this.setState({ closeOrderModal: false }, () => {
      const param = {
        Id_Sales: user.Id_Sales,
        No_Penjualan
      }

      Method.LoadingHelper.showLoading()
      closeOrderRequest(param)
    })
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
      case 4:
        return (
          <Text style={styles.menungguOrder}>Orderan dibatalkan</Text>
        );
    }
  }

  renderList = ({ item, index }) => {
    let status = 0
    let isTracking = false

    if (item.Status === 2) {
      status = 4
    } else {
      if (item.Kurir_Id) {
        status = 1
      }

      if (item.Jam_Kirim) {
        status = 2
      }

      if (item.Jam_Terima) {
        status = 3
      }

      if (item.Jam_Kirim && !item.Jam_Terima) {
        isTracking = true
      }
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
                onPress={() => this.props.navigation.navigate('DetailScreen', { data: { ...item, viewOnly: true, Nama_Kurir: item.Nama_Kurir, isSales: true } })}>
                <Icons name="info" color={'#00b9f2'} size={30} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Detail</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 13 }}>
            <Text style={styles.pembayaranTitle}>Keterangan:</Text>
            <Text style={styles.pembayaran}>{item.Keterangan ? item.Keterangan : "-"}</Text>
          </View>
          <Text style={styles.statusText}>Status Orderan:</Text>
          {this.renderStatus(status)}

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flexDirection: 'column', marginTop: 13, flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.pembayaranTitle}>Jenis Pembayaran:</Text>
                <Text style={styles.pembayaran}>{item.Id_Jenis_Pembayaran === 1 ? 'Tunai/COD' : 'Transfer'}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.pembayaranTitle}>Jumlah Bayar:</Text>
                <Text style={styles.pembayaran}>{`Rp. ${item.Nilai_Bayar}`}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.pembayaranTitle}>Ongkos Kirim:</Text>
                <Text style={styles.pembayaran}>{`Rp. ${item.Ongkos_Kirim}`}</Text>
              </View>
              {/* {item.Id_Jenis_Pembayaran === 1 &&
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.pembayaranTitle}>Status Pembayaran:</Text>
                  {item.Status === 0 ?
                    <Text style={styles.pembayaran}>Belum disetorkan</Text> :
                    <Text style={styles.pembayaran}>Sudah disetorkan</Text>}
                </View>} */}
            </View>
            {item.Id_Jenis_Pembayaran === 1 && status === 3 &&
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity
                  disabled={item.Status === 1}
                  onPress={() => this.popUpConfirmSetor(item)}>
                  <Icons name="check-box" color={item.Status === 0 ? Colors.warm_grey : Colors.alertSuccess} size={30} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                {item.Status === 0 ?
                  <Text style={styles.textSetor}>Tandai sudah menyetor</Text>
                  : <Text style={styles.textSetorSuccess}>Sudah disetorkan</Text>
                }
              </View>
            }
          </View>
          {status !== 3 && status !== 4 &&
            <TouchableOpacity
              onPress={() => this.batalkanOrderan(item)}
              style={styles.batalkanWrapper}>
              <Icons name="cancel" color={'white'} size={20} style={{ marginRight: 10 }} />
              <Text style={styles.getLokasiText}>Batalkan</Text>
            </TouchableOpacity>}
          {(item.Status === 2 || item.Jam_Setor) &&
            <TouchableOpacity
              onPress={() => this.closeOrderan(item)}
              style={styles.closeOrderWrapper}>
              <Icons name="archive" color={'white'} size={20} style={{ marginRight: 10 }} />
              <Text style={styles.getLokasiText}>Artispkan Orderan</Text>
            </TouchableOpacity>}
        </View>
      </View>
    )
  }

  setOpenList = (id) => {
    const { openList } = this.state
    let newData = openList
    let isDelete = false

    for (var i = 0; i < newData.length; i++) {
      if (newData[i] === id) {
        isDelete = true
      }
    }
    if (isDelete) {
      let newList = newData.filter(data => data !== id)
      this.setState({ openList: newList })
    } else {
      newData.push(id)
      this.setState({ openList: newData })
    }

    console.tron.error({ newData })
  }

  renderPerKurir = ({ item, index }) => {
    const { openList } = this.state
    let showList = false

    let totalList = openList.filter(data => data === item.Row_Id)

    if (totalList.length > 0) {
      showList = true
    }

    let parseList = []

    for (let i = 0; i < item.Order_Detail.length; i++) {
      let newData = {
        ...item.Order_Detail[i],
        Nama_Kurir: item.Nama_Kurir
      }
      parseList.push(newData)
    }


    return (
      <View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          flex: 1,
          marginLeft: 15,
          marginRight: 20
        }}>
          <TouchableOpacity onPress={() => this.setOpenList(item.Row_Id)} style={{ flex: 1, height: Scale(32) }}>
            {/* <Text style={styles.namaKurirBold}>
                Nama kurir :
              </Text> */}
            {item.Nama_Kurir ?
              <Text style={styles.valueKurirBold}>
                {item.Nama_Kurir}
              </Text>
              : <Text style={styles.valueKurirBoldRed}>
                Belum di pick oleh kurir
              </Text>}
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.namaKurirBold}>
                Total Order :
              </Text>
              <Text style={[styles.valueKurirBold, { marginLeft: 5 }]}>
                {item.Order_Detail.length}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              disabled={!item.Status_Tracking || !item.Nama_Kurir}
              onPress={() => this.cekStatusKurir(item.Kurir_Id, item.Status_Aktif)}
              style={item.Status_Tracking && item.Nama_Kurir ? styles.getlokasiWrapper : styles.getlokasiWrapperDisabled}>
              <Icons name="search" color={'white'} size={15} style={{ marginRight: 10 }} />
              <Text style={styles.getLokasiText}>Cari lokasi kurir</Text>
              <Icons name="pin-drop" color={'white'} size={15} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, alignSelf: 'flex-end' }}>
              <View style={item.Status_Aktif ? styles.statusBulletAktif : styles.statusBullet} />
              {
                item.Status_Aktif ?
                  <Text style={styles.statusTextKurirAktif}>Aktif</Text> :
                  <Text style={styles.statusTextKurir}>Tidak Aktif</Text>
              }
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setOpenList(item.Row_Id)} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 }}>
          <View style={styles.border} />
          {
            openList === item.Row_Id ?
              <Icons name="keyboard-arrow-up" color={'#c7c6c1'} size={30} style={{ marginLeft: 5 }} />
              : <Icons name="keyboard-arrow-down" color={'#c7c6c1'} size={30} style={{ marginLeft: 5 }} />
          }
        </TouchableOpacity>
        {
          showList &&
          <CustomFlatList
            data={parseList}
            renderItem={this.renderList.bind(this)}
            onRefresh={this.onRefresh}
            error={false}
            errorMessage={'Tidak ada data order'}
            emptyTitle={'Data Order Kosong'}
            emptyMessage={'Belum ada order yang dibuat'}
            onEndReached={() => { }}
          />
        }
      </View>
    )
  }

  render() {
    const { user, salesListOrder, getSalesListOrder } = this.props
    let name;

    if (user && user.Nama_User) {
      name = user.Nama_User
    }

    const { itemBatal, itemStor, itemClose } = this.state
    let noPenjualan = ''
    let noPenjualanClose = ''
    let noPenjualanBatal = ''
    if (itemStor && itemStor.No_Penjualan) {
      noPenjualan = itemStor.No_Penjualan
    }

    if (itemBatal && itemBatal.No_Penjualan) {
      noPenjualanBatal = itemBatal.No_Penjualan
    }

    if (itemClose && itemClose.No_Penjualan) {
      noPenjualanClose = itemClose.No_Penjualan
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HeaderMasPantes />
          {/* <Text style={styles.namaKurir}>Total Orderan yang telah dibuat: {salesListOrder.length}</Text> */}
          <View style={{ flex: 1, marginTop: 10 }}>
            <CustomFlatList
              data={salesListOrder}
              renderItem={this.renderPerKurir.bind(this)}
              refreshing={getSalesListOrder.fetching}
              onRefresh={this.onRefresh}
              error={false}
              errorMessage={'Tidak ada data order'}
              emptyTitle={'Data Order Kosong'}
              emptyMessage={'Belum ada order yang dibuat'}
              onEndReached={() => { }}
            />
          </View>
          <Modal
            isVisible={this.state.storModal}
            onBackButtonPress={this.storModalState}
            onBackdropPress={this.storModalState}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.storModalContainer}>
              <Text style={styles.textStorconfirmTitle}>Konfirmasi Setor</Text>
              <Text style={styles.textStorconfirm}>Yakin akan menandai orderan {noPenjualan} sudah disetorkan?</Text>

              <TouchableOpacity onPress={() => this.kurirSetor(itemStor)} style={styles.tandaiButton}>
                <Text style={styles.tandaiText}>Ya, Tandai</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.storModalState} style={styles.batalButton}>
                <Text style={styles.batalText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.batalModal}
            onBackButtonPress={this.batalModalState}
            onBackdropPress={this.batalModalState}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.storModalContainer}>
              <Text style={styles.textStorconfirmTitle}>Batalkan Orderan</Text>
              <Text style={styles.textStorconfirm}>Yakin akan membatalkan orderan {noPenjualanBatal}?</Text>

              <TouchableOpacity onPress={() => this.onSubmitBatalOrder(itemBatal)} style={styles.batalkanButton}>
                <Text style={styles.tandaiText}>Ya, Batalkan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.batalModalState} style={styles.batalButton}>
                <Text style={styles.batalText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.confirmTrackingModal}
            onBackButtonPress={this.confirmTrackingOn}
            onBackdropPress={this.confirmTrackingOn}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.storModalContainer}>
              <Text style={styles.textStorconfirmTitle}>Info</Text>
              <Text style={styles.textStorconfirm}>Kurir sedang tidak membuka aplikasi, tracking mungkin tidak akan realtime, harus menunggu sampai kurir membuka aplikasi, tetap lanjutkan?</Text>

              <TouchableOpacity onPress={() => this.getLokasi(false)} style={styles.tandaiButton}>
                <Text style={styles.tandaiText}>Ya, Lanjutkan Tracking</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.confirmTrackingOn} style={styles.batalButton}>
                <Text style={styles.batalText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.closeOrderModal}
            onBackButtonPress={this.closeOrderModalState}
            onBackdropPress={this.closeOrderModalState}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
          >
            <View style={styles.storModalContainer}>
              <Text style={styles.textStorconfirmTitle}>Konfirmasi Pengarsipkan Orderan</Text>
              <Text style={styles.textStorconfirm}>Orderan dengan nomor penjualan {noPenjualanClose} akan diarsipkan, orderan yang di arsipkan tidak akan ditampilkan lagi pada aplikasi, lanjutkan?</Text>

              <TouchableOpacity onPress={() => this.onArsipOrder(itemClose)} style={styles.tandaiButton}>
                <Text style={styles.tandaiText}>Ya, Lanjutkan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.confirmTrackingOn} style={styles.batalButton}>
                <Text style={styles.batalText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    getLokasiKurirRequest: (param) => dispatch(TrackingActions.getLokasiKurirRequest(param)),
    setTrackingRequest: () => dispatch(TrackingActions.setTrackingRequest()),
    kurirSetorRequest: (param) => dispatch(OrderActions.kurirSetorRequest(param)),
    getSalesListOrderRequest: (param) => dispatch(OrderActions.getSalesListOrderRequest(param)),
    cancelOrderRequest: (param) => dispatch(OrderActions.cancelOrderRequest(param)),
    closeOrderRequest: (param) => dispatch(OrderActions.closeOrderRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSalesScreen)
