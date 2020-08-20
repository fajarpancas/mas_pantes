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
import { Formik } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("No. Telepon harus diisi."),
  password: Yup.string()
    .required("Kata sandi harus diisi.")
})

const initialValue = {
  phoneCode: '+62',
}

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

  handleSubmit(values, actions) {
    this.props.navigation.navigate('AppSales')
  }

  renderForm = (props) => {
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

            {false
              ? <ActivityIndicator style={{ marginVertical: 10 }} />
              :
              <TouchableOpacity style={styles.signInBtn} onPress={props.handleSubmit}>
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
