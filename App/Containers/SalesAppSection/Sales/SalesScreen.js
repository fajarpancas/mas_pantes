import React, { Component } from 'react'
import { View, Text, StatusBar, Alert, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
// import BarcodeScannerScreen from './BarcodeScanner'
import { Colors, Fonts } from '../../../Themes'
import styles from '../../Styles/SalesScreenStyle'
import { CustomInput } from '../../../Components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { DropDownHolder } from '../../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled, CustomDatepicker } from 'react-native-awesome-component'
import PhoneRegion from '../../Auth/PhoneRegion'
import Scale from '../../../Transforms/Scale'
import OrderActions from '../../../Redux/OrderRedux'
import HeaderMasPantes from '../../../Components/HeaderMasPantes'
import CustomTableRow from '../../../Components/CustomTableRow'
import CustomModalDelete from '../../../Components/CustomModalDelete'
import CustomSelectOption from '../../../Components/CustomSelectOption'
import moment from 'moment'

const schema = Yup.object().shape({
  noFaktur: Yup.string(),
  tanggal: Yup.string(),
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
  ongkir: Yup.string()
    .required("Ongkos kirim harus diisi."),
  jenisPembayaran: Yup.string(),
  namaToko: Yup.string()
    .required("Nama Toko harus diisi."),
})

const randomA = Math.floor(Math.random() * 100000) + 1
const randomB = Math.floor(Math.random() * 100000) + 1

const initialValue = {
  noFaktur: randomA.toString() + randomB.toString(),
  phoneCode: '+62',
  tanggal: moment(new Date()).format('DD-MM-YYYY'),
  // namaCustomer: 'Fajar',
  // sales: 'Panca',
  // telephone: '87847635259',
  // keterangan: 'abcd',
  // kurir: 'Akmal',
  // alamat: 'Jl. Golf Cipanjalu no.42 RT.01 RW.11, Kec. Arcamanik, Kel.Cisaranten Binaharapan, Kota Bandung'
}

const pembayaran = [
  { id: 1, description: 'Pembayaran Tunai/COD' },
  { id: 2, description: 'Transfer' }
]

class SalesScreen extends Component {
  resetModal = undefined

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.state = {
      barcodeOpen: false,
      dataBarcode: 'No data barcode',
      kodeBarcode: '',
      jenisPembayaran: '',
      errorAlamat: false,
      errorPembayaran: false
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

  deleteDataBarang = (id) => {
    const param = {
      id
    }

    this.props.deleteBarangRequest(param)
  }

  handleSubmit(values, actions) {
    const { barang } = this.props

    let parseBarang = []
    let totalHarga = 0

    if (barang.length > 0) {
      parseBarang = barang.map((obj) => {
        return {
          No_Penjualan: values.noFaktur,
          No_Nota: values.noFaktur,
          Kd_Barang: obj.id,
          Nama_Barang: obj.Nama_Barang,
          Harga: obj.harga,
          Harga_Jual: obj.harga,
          Status: 1
        }
      })
    }

    for(let i = 0; i < barang.length; i++ ){
      totalHarga = totalHarga + barang[i].harga
    }

    const params = {
      No_Penjualan: values.noFaktur,
      Id_Sales: 2,
      Id_Member: 2,
      Nama_Customer: values.namaCustomer,
      Alamat: values.alamat,
      Jam_Kemas: values.tanggal,
      Kurir_Id: 1,
      Nilai_Bayar: totalHarga,
      Ongkos_Kirim: values.ongkir,
      Id_Jenis_Pembayaran: values.jenisPembayaran,
      Data_Barang: parseBarang,
    }

    console.tron.error({params})
  }

  cariBarang = () => {
    const { getBarangRequest } = this.props
    const { kodeBarcode } = this.state
    const param = {
      Kode_Barcode: kodeBarcode
    }

    getBarangRequest(param)
  }

  reset = () => {
    this.props.resetBarangRequest()
  }

  kemas = (props) => {
    const { barang } = this.props

    if (barang.length === 0) {
      DropDownHolder.alert('warn', 'Kemas Gagal', 'Tambahkan data barang untuk melakukan pengemasan')
    }

    if (props.values.alamat) {
      this.setState({ errorAlamat: false })
    } else {
      this.setState({ errorAlamat: true })
    }

    if (props.values.jenisPembayaran) {
      this.setState({ errorPembayaran: false })
    } else {
      this.setState({ errorPembayaran: true })
    }

    props.handleSubmit()
  }

  renderForm = (props) => {
    const { barang } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView extraScrollHeight={40}>
            <Styled.Container style={{ borderRadius: 10, marginHorizontal: 5, marginTop: 5 }}>
              <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>No. Nota </Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      editable={false}
                      name="noFaktur"
                      title={'No. Nota'}
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Nomor Nota'}
                      setFieldValue={props.setFieldValue}
                      value={props.values.noFaktur}
                      error={props.errors.noFaktur}
                      styleTitle={styles.formLabelTextDisable}
                      styleInputText={styles.formPlacholderTextDisable}
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
                    <Text style={styles.labelStyle}>Tanggal</Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      name="tanggal"
                      title={'Tanggal'}
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Tanggal'}
                      editable={false}
                      setFieldValue={props.setFieldValue}
                      value={props.values.tanggal}
                      error={props.errors.tanggal}
                      styleTitle={styles.formLabelTextDisable}
                      styleInputText={styles.formPlacholderTextDisable}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                    <Text style={styles.labelStyle}>Alamat</Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={styles.formAlamat}
                      placeholder='Alamat'
                      multiline={true}
                      autoCorrect={false}
                      defaultValue={props.values.alamat}
                      onChangeText={(value) => props.setFieldValue('alamat', value)}
                    />
                    <View style={{ marginBottom: 7 }}>
                      {this.state.errorPembayaran ? (
                        <Text style={styles.textError}>
                          Alamat harus diisi
                        </Text>
                      ) : (
                          <Text style={styles.textError} />
                        )}
                    </View>
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
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Nama kurir'}
                      setFieldValue={props.setFieldValue}
                      value={props.values.kurir}
                      error={props.errors.kurir}
                      styleTitle={styles.formLabelText}
                      styleInputText={styles.formPlacholderText}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Ongkos</Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      name="ongkir"
                      title={'ongkir'}
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Ongkos kirim'}
                      setFieldValue={props.setFieldValue}
                      value={props.values.ongkir}
                      error={props.errors.ongkir}
                      styleTitle={styles.formLabelText}
                      styleInputText={styles.formPlacholderText}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={styles.labelStyle}>Pembayaran</Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <CustomSelectOption
                    label='Jenis Pembayaran'
                    title='Jenis Pembayaran'
                    data={pembayaran}
                    defaultValue={this.state.jenisPembayaran}
                    // error={errorPembayaran}
                    error={this.state.errorPembayaran}
                    selectTitle={'Pilih pembayaran'}
                    errorMessage={'Pembayaran harus diisi'}
                    onSelect={(value) => this.setState({ jenisPembayaran: value })}
                    setFieldValue={(value) => props.setFieldValue('jenisPembayaran', value)}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Nama Toko</Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      name="namaToko"
                      title={'namaToko'}
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Nama Cabang/Toko'}
                      setFieldValue={props.setFieldValue}
                      value={props.values.namaToko}
                      error={props.errors.namaToko}
                      styleTitle={styles.formLabelText}
                      styleInputText={styles.formPlacholderText}
                    />
                  </View>
                </View>
              </View>
              {/* {this.renderSearchBar()} */}
              <View style={{ marginTop: 10 }}>
                <CustomTableRow
                  onPressEdit={(data) => this.props.navigation.navigate('EditBarang', { data })}
                  onDeleteData={(id) => this.deleteDataBarang(id)}
                  data={barang} />
              </View>
            </Styled.Container>
          </KeyboardAwareScrollView>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f5',
          paddingVertical: 10,
          justifyContent: 'center',
        }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TambahBarang')}
            style={styles.addButton}>
            <Text style={styles.addText}>Tambah</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.scanButton} onPress={this.openCloseBarcode}>
            <Text style={styles.scanText}>SCAN</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              if (barang.length > 0) {
                this.resetModal.show()
              } else {
                DropDownHolder.alert('warn', 'Reset Tidak Tersedia', 'Belum ada data barang yang ditambahkan')
              }
            }
            }
            style={styles.scanButton}
          >
            <Text style={styles.scanText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.kemas(props)} style={styles.kemasButton}>
            <Text style={styles.kemasText}>Kemas</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSearchBar = () => {
    return (
      <View style={{
        flexDirection: 'row',
        height: Scale(40),
        marginHorizontal: 12,
        marginBottom: 10,
        justifyContent: 'space-between'
      }}>
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
            backgroundColor: Colors.goldBasic
          }}>
          <Text style={styles.cariText}>
            Cari
              </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { barang } = this.props
    const { barcodeOpen } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
        {barcodeOpen ?
          <BarcodeScannerScreen closeScanner={this.openCloseBarcode} dataScanner={(value) => this.setData(value)} />
          :
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <HeaderMasPantes />
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

            <CustomModalDelete
              type={'delete'}
              title={'Reset Data Barang'}
              confirmText={'Ya, Reset'}
              onConfirm={this.reset}
              idBarang={this.state.idBarang}
              message={'Apakah anda yakin ingin menghapus semua barang?'}
              setRef={r => this.resetModal = r}
            />
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
    createOrderRequest: (param) => dispatch(OrderActions.createOrderRequest(param)),
    getBarangRequest: (param) => dispatch(OrderActions.getBarangRequest(param)),
    deleteBarangRequest: (param) => dispatch(OrderActions.deleteBarangRequest(param)),
    resetBarangRequest: (param) => dispatch(OrderActions.resetBarang(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen)
