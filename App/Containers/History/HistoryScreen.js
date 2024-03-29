import React, { Component } from 'react'
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../Styles/HistoryScreenStyle'
import { Fonts, Colors } from '../../Themes'
import OrderAction from '../../Redux/OrderRedux'

const dummyData = [
  {
    key: 1,
    transactionCode: 'Order #928322',
    date: '1 Maret 2020',
    itemName: 'Liontin Emas Discoball',
    gram: '0.644 gr',
    price: 'Rp. 1.632.000',
    tokoName: 'Toko Mas Pantes CSB',
    totalPoint: '10 Points'
  },
  {
    key: 2,
    transactionCode: 'Order #928323',
    date: '1 Maret 2020',
    itemName: 'Liontin Emas Discoball',
    gram: '0.644 gr',
    price: 'Rp. 1.632.000',
    tokoName: 'Toko Mas Pantes CSB',
    totalPoint: '23 Points'
  },
  {
    key: 3,
    transactionCode: 'Order #928324',
    date: '1 Maret 2020',
    itemName: 'Liontin Emas Discoball',
    gram: '0.644 gr',
    price: 'Rp. 1.632.000',
    tokoName: 'Toko Mas Pantes CSB',
    totalPoint: '40 Points'
  },
  {
    key: 4,
    transactionCode: 'Order #928325',
    date: '1 Maret 2020',
    itemName: 'Liontin Emas Discoball',
    gram: '0.644 gr',
    price: 'Rp. 1.632.000',
    tokoName: 'Toko Mas Pantes CSB',
    totalPoint: '5 Points'
  }
]

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
    this.onRefresh()
  } 

  onRefresh = () => {
    const { getListHistoryRequest, user } = this.props
    const { Id_User } = user
    const param = {
      Id_User,
      page: 1
    }
    getListHistoryRequest(param)
  }

  renderList = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.listWrapper} onPress={() => this.props.navigation.navigate('HistoryDetailScreen')}>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.codeOrder}>{item.transactionCode}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 2 }}>
              <Text style={styles.valueText}>{item.itemName}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.valueText}>{item.gram}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.valueText, { textAlign: 'right' }]}>{item.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <Icons name={'location-on'} color={'red'} size={20} />
          <Text style={styles.tokomasName}>{item.tokoName}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.poin}>
              {item.totalPoint}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <View style={{ marginTop: 5 }}>
          <FlatList
            data={[]}
            renderItem={this.renderList.bind(this)}
            keyExtractor={(item, index) => item.key}
          />
          <Text style={[styles.titleText, { alignSelf: 'center' }]}>
            Belum ada data
          </Text>
        </View>
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
