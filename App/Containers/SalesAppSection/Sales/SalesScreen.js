import React, { Component } from 'react'
import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
// import BarcodeScannerScreen from './BarcodeScanner'
import { Colors, Fonts, Images } from '../../../Themes'
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
import MasterDataActions from '../../../Redux/MasterDataRedux'
import HeaderMasPantes from '../../../Components/HeaderMasPantes'
import CustomTableRow from '../../../Components/CustomTableRow'
import CustomModalDelete from '../../../Components/CustomModalDelete'
import CustomSelectOption from '../../../Components/CustomSelectOption'
import moment from 'moment'
import { Method } from 'react-native-awesome-component';
import _ from 'lodash'
import Icons from 'react-native-vector-icons/MaterialIcons'

const schema = Yup.object().shape({
  // noFaktur: Yup.string(),
  tanggal: Yup.string(),
  namaCustomer: Yup.string()
    .nullable(),
  // .required("Nama Customer harus diisi."),
  // sales: Yup.string()
  //   .required("Sales harus diisi."),
  tanggal: Yup.string()
    .required("Tanggal harus diisi."),
  alamat: Yup.string()
    .required("Alamat harus diisi."),
  telephone: Yup.string()
    .required("Telepon harus diisi."),
  keterangan: Yup.string()
    .required("Keterangan harus diisi."),
  // kurir: Yup.string()
  //   .nullable(),
  // .required("Nama kurir harus diisi."),
  ongkir: Yup.string()
    .required("Ongkos kirim harus diisi."),
  // jenisPembayaran: Yup.string(),
  namaToko: Yup.string().nullable(),
})

// const randomA = Math.floor(Math.random() * 100000) + 1
// const randomB = Math.floor(Math.random() * 100000) + 1

const pembayaran = [
  { id: 1, description: 'Pembayaran Tunai/COD' },
  { id: 2, description: 'Transfer' }
]

class SalesScreen extends Component {
  resetModal = undefined

  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  })

  constructor(props) {
    super(props)
    this.state = {
      barcodeOpen: false,
      dataBarcode: 'No data barcode',
      kodeBarcode: '',
      jenisPembayaran: '',
      errorAlamat: false,
      errorPembayaran: false,
      customerName: '',
      errorCustomer: false,
      kurir: '',
      errorKurir: false,
      haveAcc: true,
      customerId: null,
      namaToko: '',
      errorToko: false,
      ongkirParse: ''
    }

    this.initialValue = {
      tanggal: moment(new Date()).format('DD MMMM YYYY'),
      // telephone: '87847635259',
      // keterangan: 'abcd',
      // ongkir: '90000',
      // namaToko: 'abc',
      // alamat: 'Jl. Golf Cipanjalu no.42 RT.01 RW.11, Kec. Arcamanik, Kel.Cisaranten Binaharapan, Kota Bandung'
    }

    this.checkDataUser = _.debounce(this.checkDataUser.bind(this), 800)
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
    const { barang, user, noPenjualan, createOrderRequest, dataUserCustomer } = this.props
    const { errorCustomer, errorPembayaran, errorKurir, errorToko } = this.state
    if (!errorCustomer && !errorPembayaran && !errorToko) {
      let parseBarang = []
      let totalHarga = 0

      if (barang.length > 0) {
        parseBarang = barang.map((obj) => {
          return {
            No_Penjualan: noPenjualan,
            No_Nota: noPenjualan,
            Kd_Barang: obj.id,
            Nama_Barang: obj.Nama_Barang,
            Harga: obj.harga,
            Harga_Jual: obj.harga,
            Url_Foto_Barang: obj.nameFoto
          }
        })
        for (let i = 0; i < barang.length; i++) {
          totalHarga = totalHarga + parseInt(barang[i].harga)
        }

        const params = {
          No_Penjualan: noPenjualan,
          Id_Sales: user.Id_Sales,
          Id_Member: null,
          User_Id: dataUserCustomer.User_Id ? dataUserCustomer.User_Id : null,
          Nama_Customer: dataUserCustomer.User_Id ? dataUserCustomer.Nama_User : values.namaCustomer,
          Alamat: values.alamat,
          Kurir_Id: values.kurir,
          Nilai_Bayar: totalHarga,
          Keterangan: values.keterangan,
          Ongkos_Kirim: values.ongkir,
          No_Telepon: values.telephone,
          Id_Jenis_Pembayaran: values.jenisPembayaran,
          Nama_Toko: this.state.namaToko,
          Kd_Toko: values.namaToko,
          Data_Barang: JSON.stringify(parseBarang)
        }
        Method.LoadingHelper.showLoading()

        createOrderRequest(params)
      }
    }
  }

  resetPropsValues = (props) => {
    props.setFieldValue('namaCustomer', '')
    props.setFieldValue('alamat', '')
    props.setFieldValue('telephone', '')
    props.setFieldValue('keterangan', '')
    props.setFieldValue('ongkir', '')
    props.setFieldValue('namaToko', '')
    this.setState({
      kurir: '',
      jenisPembayaran: '',
      customerName: '',
      namaToko: '',
      ongkirParse: ''
    })
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = () => {
    this.getListKurir()
    this.getListUser()
    this.getListToko()
  }

  getListUser = () => {
    const { getListUserRequest } = this.props
    getListUserRequest()
  }

  getListKurir = () => {
    const { getListKurirRequest } = this.props
    getListKurirRequest()
  }

  getListToko = () => {
    const { getListTokoRequest } = this.props
    getListTokoRequest()
  }

  checkDataUser(text) {
    const { cekUserRequest } = this.props

    const param = {
      No_Telepon: text
    }
    cekUserRequest(param)
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
    const { barang, dataUserCustomer } = this.props

    if (barang.length === 0) {
      DropDownHolder.alert('warn', 'Kemas Gagal', 'Tambahkan data barang untuk melakukan pengemasan')
    }

    if (props.values.alamat) {
      this.setState({ errorAlamat: false })
    } else {
      this.setState({ errorAlamat: true })
    }

    if (props.values.namaCustomer || dataUserCustomer.User_Id) {
      this.setState({ errorCustomer: false })
    } else {
      this.setState({ errorCustomer: true })
    }

    if (props.values.jenisPembayaran) {
      this.setState({ errorPembayaran: false })
    } else {
      this.setState({ errorPembayaran: true })
    }

    if (props.values.namaToko) {
      this.setState({ errorToko: false })
    } else {
      this.setState({ errorToko: true })
    }

    // if (props.values.kurir) {
    //   this.setState({ errorKurir: false })
    // } else {
    //   this.setState({ errorKurir: true })
    // }

    props.handleSubmit()
    setTimeout(() => {
      this.resetPropsValues(props)
    }, 500)
  }

  changeStateAcc = (state) => {
    this.setState({ haveAcc: state })
  }

  convertToRp = (value) => {
    // var	number_string = bilangan.toString(),
    var sisa = value.length % 3
    var rupiah = value.substr(0, sisa)
    var ribuan = value.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      var separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    this.setState({ ongkirParse: rupiah })
  }

  setOngkir = (name, text, props) => {
    let value = text.replace(/[^0-9]+/g, "");
    this.convertToRp(value.toString())
    props.setFieldValue(name, value)
  }

  renderForm = (props) => {
    const { barang, user, noPenjualan, cekUser, toko, kurirData, dataUserCustomer } = this.props
    const { fetching, error, payload } = cekUser
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
                      value={noPenjualan}
                      error={false}
                      styleTitle={styles.formLabelTextDisable}
                      styleInputText={styles.formPlacholderTextDisable}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>No. Telepon </Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomInput
                      name="telephone"
                      title={'No Telepon'}
                      returnKeyType="go"
                      keyboardType='numeric'
                      maxLength={15}
                      isReturnText={true}
                      returnValue={(text) => this.checkDataUser(text)}
                      placeholder={'Nomor Telepon'}
                      setFieldValue={props.setFieldValue}
                      value={props.values.telephone}
                      error={props.errors.telephone}
                      styleTitle={styles.formLabelText}
                      styleInputText={styles.formPlacholderText}
                    />
                  </View>
                </View>
                {payload && !fetching &&
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, alignSelf: 'flex-end' }}>
                    <Icons name='verified-user' color={Colors.alertSuccess} size={15} style={{ marginRight: 5 }} />
                    <Text style={styles.titleTextName}>Memiliki akun</Text>
                  </View>
                }
                {error && !fetching &&
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, alignSelf: 'flex-end' }}>
                    <Icons name='error' color={Colors.alertError} size={15} style={{ marginRight: 5 }} />
                    <Text style={styles.titleTextName}>Tidak memiliki akun</Text>
                  </View>
                }
                {fetching &&
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, alignSelf: 'flex-end' }}>
                    <ActivityIndicator style={{ marginRight: 10 }} size={15} color={Colors.goldBasic} />
                    <Text style={styles.titleTextName}>Mencari akun dengan no. telepone</Text>
                  </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Customer </Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    {/* <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => this.changeStateAcc(true)}
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: Scale(10) }}>
                        <Image source={this.state.haveAcc ? Images.radioActive : Images.radio} style={styles.radioIcon} />
                        <Text style={styles.cusSelect}>Memiliki akun</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.changeStateAcc(false)}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={!this.state.haveAcc ? Images.radioActive : Images.radio} style={styles.radioIcon} />
                        <Text style={styles.cusSelect}>Tidak memiliki akun</Text>
                      </TouchableOpacity>
                    </View> */}
                    {/* {!this.state.haveAcc ? */}
                    <TextInput
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Nama Customer'}
                      editable={dataUserCustomer.User_Id === ''}
                      onChangeText={(text) => {
                        props.setFieldValue('namaCustomer', text)
                      }
                      }
                      defaultValue={dataUserCustomer.User_Id ? dataUserCustomer.Nama_User : props.values.namaCustomer}
                      style={[styles.formPlacholderText, {
                        color: Colors.textBlack,
                        padding: 0,
                        borderBottomColor: '#DDDDDD',
                        borderBottomWidth: 1,
                      }]}
                    />
                    <View style={{ marginBottom: 7 }}>
                      {this.state.errorCustomer ? (
                        <Text style={styles.textError}>
                          Nama customer harus diisi
                        </Text>
                      ) : (
                          <Text style={styles.textError} />
                        )}
                    </View>
                    {/* <CustomSelectOption
                        label='Pilih Customer'
                        title='Pilih Customer'
                        data={userData}
                        defaultValue={this.state.customerName}
                        error={this.state.errorCustomer}
                        selectTitle={'Pilih Customer'}
                        errorMessage={'Nama Customer diisi'}
                        onSelect={(value) => {
                          this.setState({ customerName: value })
                          props.setFieldValue('namaCustomer', value)
                        }}
                        setFieldValue={(value) => this.setState({ customerId: value })}
                      /> */}
                    {/* } */}
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
                      value={user && user.Nama_User ? user.Nama_User : ''}
                      error={false}
                      editable={false}
                      styleTitle={styles.formLabelTextDisable}
                      styleInputText={styles.formPlacholderTextDisable}
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
                      {this.state.errorAlamat ? (
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
                  {/* <View style={{ flex: 1 }}>
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
                  </View> */}
                  <CustomSelectOption
                    label='Nama Kurir'
                    title='Pilih Kurir (Optional)'
                    data={kurirData}
                    defaultValue={this.state.kurir}
                    error={this.state.errorKurir}
                    selectTitle={'Pilih Kurir'}
                    errorMessage={'Nama Kurir diisi'}
                    onRefresh={this.onRefresh}
                    onSelect={(value) => this.setState({ kurir: value })}
                    setFieldValue={(value) => props.setFieldValue('kurir', value)}
                  />
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
                      keyboardType='numeric'
                      returnKeyType="go"
                      maxLength={15}
                      placeholder={'Ongkos kirim'}
                      setFieldValue={(name, text) => this.setOngkir(name, text, props)}
                      value={this.state.ongkirParse}
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
                    title='Pilih Jenis Pembayaran'
                    data={pembayaran}
                    defaultValue={this.state.jenisPembayaran}
                    onRefresh={this.onRefresh}
                    // error={errorPembayaran}
                    error={this.state.errorPembayaran}
                    selectTitle={'Pilih pembayaran'}
                    errorMessage={'Pembayaran harus diisi'}
                    onSelect={(value) => this.setState({ jenisPembayaran: value })}
                    setFieldValue={(value) => props.setFieldValue('jenisPembayaran', value)}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={styles.labelStyle}>Nama Toko</Text>
                    <Text style={styles.labelStyle2}>:</Text>
                  </View>
                  <CustomSelectOption
                    label='Nama Toko'
                    title='Pilih Toko/Cabang'
                    data={toko}
                    defaultValue={this.state.namaToko}
                    onRefresh={this.onRefresh}
                    // error={errorPembayaran}
                    error={this.state.errorToko}
                    selectTitle={'Pilih Toko/Cabang'}
                    errorMessage={'Toko/Cabang harus diisi'}
                    onSelect={(value) => this.setState({ namaToko: value })}
                    setFieldValue={(value) => props.setFieldValue('namaToko', value)}
                  />
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
                this.resetPropsValues(props)
              } else {
                this.resetPropsValues(props)
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
                  initialValues={this.initialValue}
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

  const tokoLists = state.order.listToko
  let toko = tokoLists.map((obj) => {
    return { id: obj.Kd_Toko, description: obj.Nama_Toko };
  });

  const userLists = state.masterData.listUser;
  let userData = userLists.map((obj) => {
    return { id: obj.User_Id, description: obj.Nama_User };
  });

  const kurirLists = state.masterData.listKurir;
  let kurirData = kurirLists.map((obj) => {
    return { id: obj.Kurir_Id, description: obj.Nama_User };
  });

  return {
    toko,
    userData,
    kurirData,
    barang,
    user: state.session.userSession,
    noPenjualan: state.session.noPenjualan,
    dataUserCustomer: state.order.dataUser,
    cekUser: state.order.cekUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListTokoRequest: () => dispatch(OrderActions.getListTokoRequest()),
    getListUserRequest: () => dispatch(MasterDataActions.getListUserRequest()),
    getListKurirRequest: () => dispatch(MasterDataActions.getListKurirRequest()),
    createOrderRequest: (param) => dispatch(OrderActions.createOrderRequest(param)),
    getBarangRequest: (param) => dispatch(OrderActions.getBarangRequest(param)),
    deleteBarangRequest: (param) => dispatch(OrderActions.deleteBarangRequest(param)),
    resetBarangRequest: (param) => dispatch(OrderActions.resetBarang(param)),
    cekUserRequest: (param) => dispatch(OrderActions.cekUserRequest(param)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen)
