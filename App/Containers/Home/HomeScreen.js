import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  StatusBar,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/HomeScreenStyle'
import { Colors, Images } from '../../Themes'
import Scale from '../../Transforms/Scale'
import QRCode from 'react-native-qrcode-svg'

const dummyData = [
  { title: 'Discount 50% PromoOpening Toko Emas Pantes di Grage Citi Mall Cirebon' },
  { title: 'Discount 50% PromoOpening Toko Emas Pantes di Grage Citi Mall Cirebon' },
  { title: 'Discount 50% PromoOpening Toko Emas Pantes di Grage Citi Mall Cirebon' },
  { title: 'Discount 50% PromoOpening Toko Emas Pantes di Grage Citi Mall Cirebon' },
  { title: 'Discount 50% PromoOpening Toko Emas Pantes di Grage Citi Mall Cirebon' },
  { title: 'Discount 50% PromoOpening Toko Emas Pantes di Grage Citi Mall Cirebon' }
]

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qrValue: 'Pejuang Subuh'
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
      <View style={styles.headerLeft}>
        <Text style={styles.hiText}>Hai,</Text>
        <Text style={styles.usernameText}>Pejuang Subuh</Text>
      </View>
    ),
    headerRight: () => (
      <View style={{ marginRight: 20, marginTop: 10 }}>
        <View style={styles.notificationWrapper}>
          <Text style={styles.notificationTotal}>
            10
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('InboxScreen')}>
          <Icon name="notifications" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#ccb102',
      elevation: 0
    }
  })

  renderBerita = ({ title }) => {
    return (
      <TouchableOpacity style={styles.listBeritaWrapper} onPress={() => this.props.navigation.navigate('BeritaDetailScreen')}>
        <Image source={Images.tokoemas} style={styles.gambarStyle} />
        <Text style={styles.listText}>{title}</Text>
      </TouchableOpacity>
    )
  }

  onButtonPress = () => {
    BackHandler.exitApp()
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => this.onButtonPress()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <View style={styles.backgroundTop} />
        <View style={styles.infoPointWrapper}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <View style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: Scale(80)
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.pointText}>Poin Anda</Text>
                <Text style={styles.numberText}>9328329</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.tukarPointText}>Tuker Point</Text>
                <Icon name="chevron-right" size={20} color={'#63ccc5'} />
              </View>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <View style={{ alignSelf: 'flex-end' }}>
                <QRCode
                  value={this.state.qrValue}
                  color={Colors.textBlack}
                  backgroundColor={'white'}
                  size={Scale(60)}
                  logoMargin={2}
                  logoSize={20}
                  logoBorderRadius={10}
                  logoBackgroundColor={'transparent'}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, marginTop: Scale(55) }}>
          <ScrollView>
            {dummyData.map(this.renderBerita)}
          </ScrollView>
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
