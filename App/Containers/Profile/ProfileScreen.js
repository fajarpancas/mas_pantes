import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../Styles/ProfileScreenStyle'
import { Colors } from '../../Themes'
import QRCode from 'react-native-qrcode-svg'
import Scale from '../../Transforms/Scale'
import Modal from 'react-native-modal'

const profileInform = [
  {
    key: 1,
    title: 'Poin',
    icon: 'monetization-on',
    value: '10 Poin',
    color: 'orange'
  },
  {
    key: 2,
    title: 'Email',
    icon: 'email',
    value: 'pejuangsubuh@vs.me',
    color: '#63ccc5'
  },
  {
    key: 3,
    title: 'Phone',
    icon: 'phone',
    value: '+6287847123123',
    color: 'brown'
  }
]

const privacyInform = [
  {
    key: 1,
    title: 'Pelajari FAQ',
    navigation: 'PelajariFaqScreen'
  },
  {
    key: 2,
    title: 'Berikan Penilaian',
    navigation: 'BerikanPenilaianScreen'
  },
  {
    key: 3,
    title: 'Hubungi Kami',
    navigation: 'HubungiKamiScreen'
  },
  {
    key: 4,
    title: 'Kebijakan Privasi',
    navigation: 'KebijakanPrivasiScreen'
  }
]

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qrValue: 'Pejuang Subuh',
      modalShow: true
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  renderInform({ title, icon, value, color }) {
    return (
      <View style={styles.informWrapper}>
        <Icons style={{ marginLeft: 5 }} name={icon} color={color} size={20} />
        <Text style={styles.pointTitle}>{title}</Text>
        <Text style={styles.pointValue}>{value}</Text>
      </View>
    )
  }

  renderInformBottom = ({ title, navigation }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(navigation)} style={styles.informBottomWrapper}>
        <Text style={styles.pointTitle}>{title}</Text>
        <Icons name={'chevron-right'} size={23} color={'orange'} />
      </TouchableOpacity>
    )
  }

  showOffModal = () => {
    this.setState({ modalShow: !this.state.modalShow })
  }

  render() {
    const { modalShow } = this.state
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <ScrollView>
          <View style={styles.topHeaderWrapper}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfileScreen')} style={{ alignSelf: 'flex-end' }}>
              <Icons name='settings' color={'orange'} size={25} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ alignSelf: 'center' }}>
                <QRCode
                  value={this.state.qrValue}
                  color={Colors.textBlack}
                  backgroundColor={'white'}
                  size={Scale(140)}
                  logoMargin={2}
                  logoSize={20}
                  logoBorderRadius={10}
                  logoBackgroundColor={'transparent'}
                />
                <Text style={styles.valueQr}>{this.state.qrValue}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10, backgroundColor: Colors.white }}>
            {profileInform.map(this.renderInform)}
          </View>

          <View style={{ marginTop: 10, backgroundColor: Colors.white }}>
            {privacyInform.map(this.renderInformBottom)}
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Auth')}
            style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>

          {/* <Modal
          onBackButtonPress={this.showOffModal}
          onBackdropPress={this.showOffModal}
          isVisible={modalShow}>
          <View style={styles.modalWrapper}>
            <Text>a</Text>
          </View>
        </Modal> */}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
