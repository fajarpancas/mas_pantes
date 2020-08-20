import React, { Component } from 'react'
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
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

class SignInScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneCode: '+62',
      phoneNumber: '',
      password: '',
      errorPhoneNumber: false,
      errorPassword: false
    }
  }

  onSubmit = () => {
    const { phoneCode, phoneNumber, password } = this.state

    phoneNumber === '' ? this.setState({ errorPhoneNumber: true }) : this.setState({ errorPhoneNumber: false })
    password === '' ? this.setState({ errorPassword: true }) : this.setState({ errorPassword: false })

    if (phoneNumber !== '' && password !== '') {
      const params = {
        phone: phoneCode + phoneNumber,
        password: password
      }

      this.props.navigation.navigate('App')
      console.log(params)
    }
  }

  renderForm = () => {
    const {
      phoneCode,
      phoneNumber,
      password,
      errorPhoneNumber,
      errorPassword
    } = this.state
    return (
      <KeyboardAwareScrollView extraScrollHeight={40} style={{ marginHorizontal: 25 }}>
        <Styled.Container padded style={{ borderRadius: 10 }}>
          <View style={{ padding: 15 }}>
            <Text style={styles.titleSignIn}>Masuk ke Aplikasi</Text>
            <CustomInput
              label
              name="phoneNumber"
              title={'No. Telepon'}
              returnKeyType="go"
              keyboardType="numeric"
              maxLength={15}
              setFieldValue={(label, value) => this.setState({ phoneNumber: value })}
              placeholder={'Masukkan nomor telepon'}
              value={phoneNumber}
              error={true}
              styleTitle={styles.formLabelText}
              styleInputText={styles.formPlacholderText}
              renderLeft={() => {
                return (
                  <PhoneRegion
                    value={phoneCode}
                    onSubmit={({ label, value }) => {
                      console.tron.log('onSubmit ', label, value)
                      this.setState({ phoneCode: value })
                    }}
                  />
                )
              }}
            />
            <Text style={styles.textError}>
              {errorPhoneNumber ?
                'Nomor telepon tidak boleh dikosongkan'
                : ''}
            </Text>

            <CustomInput
              label
              name="password"
              title={'Kata Sandi'}
              autoCapitalize="none"
              returnKeyType="go"
              maxLength={15}
              placeholder={'Masukkan kata sandi'}
              setFieldValue={(label, value) => this.setState({ password: value })}
              secureTextEntry={true}
              value={password}
              error={true}
              toggleShowPassword
              styleTitle={styles.formLabelText}
              styleInputText={styles.formPlacholderText}
            />
            <Text style={styles.textError}>
              {errorPassword ?
                'Password tidak boleh dikosongkan'
                : ''}
            </Text>

            {false
              ? <ActivityIndicator style={{ marginVertical: 10 }} />
              :
              <TouchableOpacity style={styles.signInBtn} onPress={this.onSubmit}>
                <Text style={styles.signInButtonText}>
                  Masuk
              </Text>
              </TouchableOpacity>
            }
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
          {this.renderForm()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
