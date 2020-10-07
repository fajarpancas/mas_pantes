import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ListOrder from './ListOrder'
import { CustomFlatList } from '../../Components'
import OrderActions from '../../Redux/OrderRedux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../Styles/ListOrderScreenStyle'

class FinishOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    const { getOrderFinishRequest, user } = this.props
    setTimeout(() => {
      const params = {
        page: 1,
        Kurir_Id: user.Id_Kurir
      }

      getOrderFinishRequest(params)
    }, 1000)
  }

  renderList = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
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
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen')}>
                <Icons name="info" color={'#00b9f2'} size={40} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Detail</Text>
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

          <Text style={styles.namaKurir}>Nama Kurir: {name}</Text>
          <CustomFlatList
            data={listOrder}
            renderItem={this.renderList.bind(this)}
            refreshing={getOrder.fetching}
            onRefresh={this.onRefresh}
            error={false}
            errorMessage={'Tidak ada data order'}
            onEndReached={() => { }}
          />

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.userSession,
    getOrder: state.order.getOrderFinish,
    listOrder: state.order.listOrderFinish
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderFinishRequest: (params) => dispatch(OrderActions.getOrderFinishRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishOrderScreen)
