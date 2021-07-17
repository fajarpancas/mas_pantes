import React, { Component } from 'react'
import {
  StatusBar,
  ActivityIndicator,
  View,
  Text,
  Linking,
  Image
} from 'react-native'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import styles from '../Styles/SignInScreenStyle'
import { CustomInput } from '../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled } from 'react-native-awesome-component'
import PhoneRegion from './PhoneRegion'
import images from '../../Themes/Images'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'react-native-modal'
import AuthActions from '../../Redux/AuthRedux'
import { TouchableOpacity } from 'react-native-gesture-handler'

const schema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("No. Telepon harus diisi."),
  password: Yup.string()
    .required("Kata sandi harus diisi.")
})

const initialValue = {
  // phoneNumber: '081',
  // password: '123456'
}

class SignInScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      password: '',
      errorPhoneNumber: false,
      errorPassword: false,
      user: 'customer',
      modal: false
    }
  }

  handleSubmit(values, actions) {
    const { loginRequest } = this.props

    const params = {
      email: values.phoneNumber,
      password: values.password,
      version_code: '2.0'
    }

    loginRequest(params)

    // switch (this.state.user) {
    //   case 'customer':
    //     this.props.navigation.navigate('App')
    //     break;
    //   case 'sales':
    //     this.props.navigation.navigate('AppSales')
    //     break;
    //   case 'kurir':
    //     this.props.navigation.navigate('AppKurir')
    //     break;
    // }
  }

  showOffModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  createAccount = () => {
    Linking.openURL('http://pantesgold.motekarindo.com/register')
  }

  modalPickUser = () => {
    return (
      <Modal
        onBackButtonPress={this.showOffModal}
        onBackdropPress={this.showOffModal}
        backdropTransitionOutTiming={0}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={this.state.modal}>
        <View style={styles.modalDeleteWrapper}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ user: 'customer' }, () => {
                this.showOffModal()
              })
            }}
            style={styles.cutomList}>
            <Text style={styles.title}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ user: 'sales' }, () => {
                this.showOffModal()
              })
            }}
            style={styles.cutomList}>
            <Text style={styles.title}>Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ user: 'kurir' }, () => {
                this.showOffModal()
              })
            }}
            style={styles.cutomList}>
            <Text style={styles.title}>Kurir</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  renderForm = (props) => {
    const { login } = this.props
    const { fetching } = login
    return (
      <KeyboardAwareScrollView extraScrollHeight={40} style={{ marginHorizontal: 25 }}>
        <Styled.Container padded style={{ borderRadius: 10 }}>
          <View style={{ padding: 15 }}>
            <Text style={styles.titleSignIn}>Masuk ke Aplikasi</Text>
            {/* <View style={{ flexDirection: 'column', marginBottom: 15 }}>
              <Text style={styles.formLabelText}>Masuk sebagai</Text>
              <TouchableOpacity style={styles.chooseButton} onPress={this.showOffModal}>
                <Text style={styles.textUser}>{this.state.user} (mode develop only while waiting API)</Text>
              </TouchableOpacity>
            </View> */}
            {/* <CustomInput
              label
              name="phoneNumber"
              title={'No. Telepon'}
              returnKeyType="go"
              keyboardType="numeric"
              maxLength={15}
              setFieldValue={props.setFieldValue}
              placeholder={'Masukkan nomor telepon'}
              value={props.values.phoneNumber}
              error={props.errors.phoneNumber}
              styleTitle={styles.formLabelText}
              styleInputText={styles.formPlacholderText}
              renderLeft={() => {
                return (
                  <PhoneRegion
                    editable={false}
                    value={props.values.phoneCode}
                    onSubmit={({ label, value }) => {
                      console.tron.log('onSubmit ', label, value)
                      props.setFieldValue('phoneCode', value)
                    }}
                  />
                )
              }}
            /> */}
            <CustomInput
              label
              name="phoneNumber"
              title={'Nomor Telepon'}
              autoCapitalize="none"
              keyboardType='numeric'
              returnKeyType="go"
              maxLength={15}
              placeholder={'Masukkan nomor telepon'}
              setFieldValue={props.setFieldValue}
              value={props.values.phoneNumber}
              error={props.errors.phoneNumber}
              styleTitle={styles.formLabelText}
              styleInputText={styles.formPlacholderText}
            />

            <CustomInput
              label
              name="password"
              title={'Kata Sandi'}
              autoCapitalize="none"
              returnKeyType="go"
              maxLength={15}
              placeholder={'Masukkan kata sandi'}
              secureTextEntry={true}
              setFieldValue={props.setFieldValue}
              value={props.values.password}
              error={props.errors.password}
              toggleShowPassword
              styleTitle={styles.formLabelText}
              styleInputText={styles.formPlacholderText}
            />

            {fetching
              ? <ActivityIndicator style={{ marginVertical: 10 }} />
              :
              <TouchableOpacity style={styles.signInBtn} onPress={props.handleSubmit}>
                <Text style={styles.signInButtonText}>
                  Masuk
              </Text>
              </TouchableOpacity>
            }
            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <Text style={styles.buatAkun}>Belum punya Akun?</Text>
              <TouchableOpacity onPress={this.createAccount}>
                <Text style={styles.buatAkunBlue}>Buat akun baru</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Styled.Container>
      </KeyboardAwareScrollView>
    )
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ccb102', justifyContent: 'center' }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#512f25'} />
        <Image source={images.pantes} style={styles.logoPantes} />
        <View style={{ height: 'auto' }}>
          <Formik
            ref={ref => { this.formik = ref }}
            onSubmit={this.handleSubmit.bind(this)}
            validationSchema={schema}
            render={this.renderForm.bind(this)}
            validateOnChange={false}
            initialValues={initialValue}
          />
          {/* {this.renderForm()} */}
        </View>
        {this.modalPickUser()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (params) => dispatch(AuthActions.loginRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
