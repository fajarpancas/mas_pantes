import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/MaterialIcons'
import styles from '../Styles/ProfileScreenStyle'
import { Colors, Fonts, Images } from '../../Themes'
import QRCode from 'react-native-qrcode-svg'
import Scale from '../../Transforms/Scale'
import Modal from 'react-native-modal'
import CustomModalDelete from '../../Components/CustomModalDelete'

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
  modalLogout = undefined

  constructor(props) {
    super(props)
    this.state = {
      qrValue: 'Pejuang Subuh',
      modalShow: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Akun Saya',
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

  // renderInform({ title, icon, value, color }) {
  //   return (
  //     <View style={styles.informWrapper}>
  //       <Icons style={{ marginLeft: 5 }} name={icon} color={color} size={20} />
  //       <Text style={styles.pointTitle}>{title}</Text>
  //       <Text style={styles.pointValue}>{value}</Text>
  //     </View>
  //   )
  // }

  renderList = ({ title, navigation }) => {
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => this.props.navigation.navigate(navigation)}>
        <Text style={styles.textList}>{title}</Text>
        <Icons name={'chevron-right'} size={25} color={Colors.goldBasic} />
      </TouchableOpacity>
    )
  }

  logout =() => {
    this.props.navigation.navigate('Auth')
  }

  showOffModal = () => {
    this.setState({ modalShow: !this.state.modalShow })
  }

  qrModal = () => {
    return (
      <Modal
        onBackButtonPress={this.showOffModal}
        onBackdropPress={this.showOffModal}
        backdropTransitionOutTiming={0}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={this.state.modalShow}>
        <View style={styles.modalDeleteWrapper}>
          <View style={{ alignSelf: 'center' }}>
            <QRCode
              value={this.state.qrValue}
              color={Colors.textBlack}
              backgroundColor={'white'}
              size={Scale(180)}
              logoMargin={2}
              logoSize={20}
              logoBorderRadius={10}
              logoBackgroundColor={'transparent'}
            />
            <Text style={styles.qrValueText}>{this.state.qrValue}</Text>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        <ScrollView>
          <View style={styles.profilWrapper}>
            <QRCode
              value={this.state.qrValue}
              color={Colors.textBlack}
              backgroundColor={'white'}
              size={Scale(50)}
              logoMargin={2}
              logoSize={20}
              logoBorderRadius={10}
              logoBackgroundColor={'transparent'}
            />
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 15
            }}>
              <Text style={styles.namaToko}>Fajar Panca Saputra</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Icons name='email' style={{ marginTop: Scale(1) }} size={13} color={Colors.textGrey} />
                <Text style={styles.namaSales}>pejuangsubuh@vs.me</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Icons name='phone' size={13} color={Colors.textGrey} />
                <Text style={styles.namaSales}>+6287847635123</Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.showOffModal}>
              <Text style={styles.lihat}>TAMPILKAN</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: Colors.white }}>
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
              <Text style={styles.textList}>Edit Profil</Text>
              <Icons name={'chevron-right'} size={25} color={Colors.goldBasic} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, backgroundColor: Colors.white }}>
            {privacyInform.map(this.renderList)}
          </View>

          <TouchableOpacity
            onPress={() => this.modalLogout.show()}
            style={styles.logoutButton}>
            <Text style={styles.logoutText}>KELUAR</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 10, marginBottom: 40 }}>
            <Text style={styles.copyright}>© 2020 Toko Mas Pantes. All Rights Reserved.</Text>
            <Text style={styles.copyright}>App Customer Section, App Version 1.0</Text>
          </View>
        </ScrollView>
        <CustomModalDelete
          title={'Keluar'}
          confirmText={'Ya, Keluar'}
          onConfirm={this.logout}
          message={'Apakah anda yakin ingin keluar dari akun ini?'}
          setRef={r => this.modalLogout = r}
        />
        {this.qrModal()}
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
