import React, { Component } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import BarcodeScannerScreen from './BarcodeScanner'
import { Colors, Fonts } from '../../../Themes'
import styles from '../../Styles/SalesScreenStyle'
import { CustomInput } from '../../../Components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled } from 'react-native-awesome-component'
import PhoneRegion from '../../Auth/PhoneRegion'
import Scale from '../../../Transforms/Scale'
import OrderActions from '../../../Redux/OrderRedux'

const schema = Yup.object().shape({
  noFaktur: Yup.string()
    .required("No. Telepon harus diisi."),
  namaCustomer: Yup.string()
    .required("Nama Customer harus diisi."),
  sales: Yup.string()
    .required("Sales harus diisi."),
  tanggal: Yup.string()
    .required("Tanggal harus diisi."),
  alamat: Yup.string()
    .required("Alamat harus diisi."),
  telephone: Yup.string()
    .required("Telepon harus diisi."),
  keterangan: Yup.string()
    .required("Keterangan harus diisi."),
  kurir: Yup.string()
    .required("Nama kurir harus diisi."),
})

const dummyData = [
  { key: 1, no: 1, name: 'Mas Antam', harga: '800.000', foto: 'foto' },
  { key: 2, no: 2, name: 'Mas Murni', harga: '600.000', foto: 'foto' },
  { key: 3, no: 3, name: 'Mas Antam 2', harga: '500.000', foto: 'foto' },
  { key: 4, no: 4, name: 'Mas Antam 3', harga: '300.000', foto: 'foto' },
  { key: 5, no: 5, name: 'Mas Antam', harga: '800.000', foto: 'foto' },
  { key: 6, no: 6, name: 'Mas Murni', harga: '600.000', foto: 'foto' },
  { key: 7, no: 7, name: 'Mas Antam 2', harga: '500.000', foto: 'foto' },
  { key: 8, no: 8, name: 'Mas Antam 3', harga: '300.000', foto: 'foto' },
  { key: 9, no: 9, name: 'Mas Murni', harga: '600.000', foto: 'foto' },
  { key: 10, no: 10, name: 'Mas Antam 2', harga: '500.000', foto: 'foto' },
]

const initialValue = {
  phoneCode: '+62',
}

class SalesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => {
      return (
        <View style={styles.headerWrapper}>
          <Text style={styles.textTokoMas}>TOKO MAS PANTES</Text>
        </View>
      )
    },
    headerTitleStyle: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: Fonts.type.acuminProSemiBold,
      textTransform: 'uppercase',
      flex: 1,
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
      barcodeOpen: false,
      dataBarcode: 'No data barcode',
      kodeBarcode: ''
    }
  }

  openCloseBarcode = () => {
    this.setState({ barcodeOpen: !this.state.barcodeOpen })
  }

  setData = (value) => {
    const { getBarangRequest } = this.props
    const param = {
      Kode_Barcode: value
    }

    getBarangRequest(param)
  }

  handleSubmit(values, actions) {
    this.props.navigation.navigate('AppSales')
  }

  cariBarang = () => {
    const { getBarangRequest } = this.props
    const { kodeBarcode } = this.state
    const param = {
      Kode_Barcode: kodeBarcode
    }

    getBarangRequest(param)
  }

  renderTableHeader = () => {
    return (
      <View style={styles.headerTable}>
        <View style={styles.borderTableNo}>
          <Text style={styles.valueTable}>No</Text>
        </View>
        <View style={styles.borderTableNamaBarang}>
          <Text style={styles.valueTable}>Nama barang</Text>
        </View>
        <View style={styles.borderTableHarga}>
          <Text style={styles.valueTable}>Harga</Text>
        </View>
        <View style={styles.borderTableFoto}>
          <Text style={styles.valueTable}>Foto</Text>
        </View>
      </View>
    )
  }

  renderTableTotal = () => {
    return (
      <View style={styles.headerTable}>
        <View style={styles.borderTableTotal}>
          <Text style={styles.valueTable}>Total</Text>
        </View>
        <View style={styles.borderTableTotal}>
          <Text style={styles.valueTable}>9000000000</Text>
        </View>
      </View>
    )
  }

  renderTableValue = ({no, Nama_Barang }) => {
    return (
      <View style={styles.headerTable}>
        <View style={styles.borderTableNoValue}>
          <Text style={styles.valueTableFill}>{no}</Text>
        </View>
        <View style={styles.borderTableNamaBarangValue}>
          <Text style={styles.valueTableFill}>{Nama_Barang}</Text>
        </View>
        <View style={styles.borderTableHargaValue}>
          <Text style={styles.valueTableFill}>-</Text>
        </View>
        <View style={styles.borderTableFotoValue}>
          <Text style={styles.valueTableFill}></Text>
        </View>
      </View>
    )
  }

  renderForm = (props) => {
    const { barang } = this.props
    return (
      <KeyboardAwareScrollView extraScrollHeight={40}>
        <Styled.Container style={{ borderRadius: 10, marginHorizontal: 5, marginTop: 5 }}>
          <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>No. Faktur </Text>
                <Text style={styles.labelStyle2}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  editable={false}
                  name="noFaktur"
                  title={'No. Faktur'}
                  autoCapitalize="none"
                  returnKeyType="go"
                  maxLength={15}
                  placeholder={'Nomor faktur'}
                  setFieldValue={props.setFieldValue}
                  value={props.values.noFaktur}
                  error={props.errors.noFaktur}
                  styleTitle={styles.formLabelText}
                  styleInputText={styles.formPlacholderText}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>Customer </Text>
                <Text style={styles.labelStyle2}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  name="namaCustomer"
                  autoCapitalize="none"
                  returnKeyType="go"
                  maxLength={15}
                  placeholder={'Nama Customer'}
                  setFieldValue={props.setFieldValue}
                  value={props.values.namaCustomer}
                  error={props.errors.namaCustomer}
                  styleTitle={styles.formLabelText}
                  styleInputText={styles.formPlacholderText}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>Sales</Text>
                <Text style={styles.labelStyle2}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  name="sales"
                  title={'sales'}
                  autoCapitalize="none"
                  returnKeyType="go"
                  maxLength={15}
                  placeholder={'Nama Sales'}
                  setFieldValue={props.setFieldValue}
                  value={props.values.sales}
                  error={props.errors.sales}
                  styleTitle={styles.formLabelText}
                  styleInputText={styles.formPlacholderText}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>Telepon</Text>
                <Text style={styles.labelStyle2}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  name="telephone"
                  title={'No. Telepon'}
                  returnKeyType="go"
                  keyboardType="numeric"
                  maxLength={15}
                  setFieldValue={props.setFieldValue}
                  placeholder={'Nomor telepon'}
                  value={props.values.telephone}
                  error={props.errors.telephone}
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
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>Ket.</Text>
                <Text style={styles.labelStyle2}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  name="keterangan"
                  autoCapitalize="none"
                  returnKeyType="go"
                  maxLength={15}
                  placeholder={'Keterangan'}
                  setFieldValue={props.setFieldValue}
                  value={props.values.keterangan}
                  error={props.errors.keterangan}
                  styleTitle={styles.formLabelText}
                  styleInputText={styles.formPlacholderText}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.labelStyle}>Kurir</Text>
                <Text style={styles.labelStyle2}>:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  name="kurir"
                  title={'kurir'}
                  autoCapitalize="none"
                  returnKeyType="go"
                  maxLength={15}
                  placeholder={'Nama kurir'}
                  setFieldValue={props.setFieldValue}
                  value={props.values.noFaktur}
                  error={props.errors.noFaktur}
                  styleTitle={styles.formLabelText}
                  styleInputText={styles.formPlacholderText}
                />
              </View>
            </View>
          </View>
          {this.renderTableHeader()}
          {barang.map(this.renderTableValue)}
          {this.renderTableTotal()}
        </Styled.Container>
      </KeyboardAwareScrollView>
    )
  }

  render() {
    const { barcodeOpen } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        {barcodeOpen ?
          <BarcodeScannerScreen closeScanner={this.openCloseBarcode} dataScanner={(value) => this.setData(value)} />
          :
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={styles.headerWrapperCabang}>
                <Text style={styles.textCabang}>Cabang : Garage City Mall</Text>
              </View>
              <View style={{ flexDirection: 'row', marginHorizontal: 12, justifyContent: 'space-between' }}>
                <TextInput
                  placeholder={'kode barcode'}
                  defaultValue={this.state.kodeBarcode}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ kodeBarcode: value })}
                />
                <TouchableOpacity
                  onPress={this.cariBarang}
                  style={{
                    width: Scale(100),
                    justifyContent: 'center',
                    backgroundColor: 'orange'
                  }}>
                  <Text style={{ color: 'white', alignSelf: 'center' }}>
                    Cari
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingBottom: 5 }}>
                <Formik
                  ref={ref => { this.formik = ref }}
                  onSubmit={this.handleSubmit.bind(this)}
                  validationSchema={schema}
                  render={this.renderForm.bind(this)}
                  validateOnChange={false}
                  initialValues={initialValue}
                />
              </View>
            </View>

            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#f5f5f5',
                paddingVertical: 10,
                justifyContent: 'center',
              }}>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addText}>Tambah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.scanButton} onPress={this.openCloseBarcode}>
                  <Text style={styles.scanText}>SCAN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.kemasButton}>
                  <Text style={styles.kemasText}>Kemas</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ alignSelf: 'center' }}>{this.state.dataBarcode}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const barangData = state.order.listBarang

  const barang = []

  for (let i = 0; i < barangData.length; i++) {
    barang.push({
      ...barangData[i],
      no: i + 1
    })
  }

  return {
    barang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBarangRequest: (param) => dispatch(OrderActions.getBarangRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen)
