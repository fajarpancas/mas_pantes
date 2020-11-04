import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import styles from '../Styles/ListOrderScreenStyle'
import { Colors } from '../../Themes'
import OrderActions from '../../Redux/OrderRedux'
import { CustomFlatList } from '../../Components'
import Icons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import Scale from '../../Transforms/Scale'
import Modal from 'react-native-modal'
import { Method } from 'react-native-awesome-component'

class ProgressOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })

  constructor(props) {
    super(props)
    this.state = {
      itemBatal: undefined,
      batalModal: false,
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    const { getOrderNextProcessRequest, user } = this.props
    setTimeout(() => {
      const params = {
        page: 1,
        Kurir_Id: user.Id_Kurir
      }

      getOrderNextProcessRequest(params)
    }, 1000)
  }

  batalModalState = () => {
    this.setState({ batalModal: !this.state.batalModal })
  }

  batalkanOrderan = (item) => {
    this.setState({ itemBatal: item }, () => {
      this.batalModalState()
    })
  }

  onSubmitBatalOrder = (item) => {
    const { No_Penjualan } = item
    const { user, cancelPickRequest } = this.props
    this.setState({ batalModal: false }, () => {
      const param = {
        Id_Kurir: user.Id_Kurir,
        No_Penjualan
      }

      Method.LoadingHelper.showLoading()
      cancelPickRequest(param)
    })
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
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Icons name="place" size={25} color={'red'} style={{ marginRight: 10 }} />
                <Text style={styles.textInfoAlamat}>{item.Alamat}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={[styles.pembayaranTitle, { lineHeight: 17 }]}>Keterangan:</Text>
                <Text style={[styles.pembayaran, { width: Scale(195), lineHeight: 17 }]}>{item.Keterangan ? item.Keterangan : "-"}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => this.props.navigation.navigate('DetailScreen', { data: { ...item, viewOnly: false } })}>
                <Icons name="arrow-forward" color={'#00b9f2'} size={30} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Selesai</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.batalkanOrderan(item)}
            style={styles.batalkanWrapper}>
            <Icons name="cancel" color={'white'} size={20} style={{ marginRight: 10 }} />
            <Text style={styles.getLokasiText}>Batalkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { user, listOrderProcess, getOrderProcess } = this.props
    let name;

    if (user && user.Nama_User) {
      name = user.Nama_User
    }

    const { itemBatal } = this.state
    let noPenjualanBatal = ''
   
    if (itemBatal && itemBatal.No_Penjualan) {
      noPenjualanBatal = itemBatal.No_Penjualan
    }

    return (
      <View style={{ flex: 1 }}>
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
            <Text style={[styles.textInfoTotal, { textAlign: 'right', flex: 1 }]}>Total Order Dikirim: {listOrderProcess.length}</Text>
          </View>

          <CustomFlatList
            data={listOrderProcess}
            renderItem={this.renderList.bind(this)}
            refreshing={getOrderProcess.fetching}
            onRefresh={this.onRefresh}
            error={false}
            emptyTitle='Tidak ada data'
            emptyMessage='Belum ada orderan yang sedang dalam proses pengiriman'
            errorMessage={'Tidak ada data order'}
            onEndReached={() => { }}
          />

        </View>
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
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.userSession,
    getOrderProcess: state.order.getOrderNextProcess,
    listOrderProcess: state.order.listOrderNextProcess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelPickRequest: (params) => dispatch(OrderActions.cancelPickRequest(params)),
    getOrderNextProcessRequest: (params) => dispatch(OrderActions.getOrderNextProcessRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressOrderScreen)
