import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import styles from '../Styles/ListOrderScreenStyle'
import { Colors } from '../../Themes'
import OrderActions from '../../Redux/OrderRedux'
import { CustomFlatList } from '../../Components'
import Icons from 'react-native-vector-icons/MaterialIcons'

class ProgressOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

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
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => this.props.navigation.navigate('DetailScreen', { data: item })}>
                <Icons name="arrow-forward" color={'#00b9f2'} size={30} style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
              <Text style={styles.textKirim}>Selesai</Text>
            </View>
          </View>
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

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* <HeaderMasPantes /> */}

          <Text style={styles.namaKurir}>Nama Kurir: {name}</Text>
          <CustomFlatList
            data={listOrderProcess}
            renderItem={this.renderList.bind(this)}
            refreshing={getOrderProcess.fetching}
            onRefresh={this.onRefresh}
            error={false}
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
    getOrderProcess: state.order.getOrderNextProcess,
    listOrderProcess: state.order.listOrderNextProcess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderNextProcessRequest: (params) => dispatch(OrderActions.getOrderNextProcessRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressOrderScreen)
