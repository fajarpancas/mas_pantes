import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import { Colors, Fonts, Images } from '../../Themes'
import Scale from '../../Transforms/Scale'
import styles from '../Styles/ListOrderScreenStyle'
import CustomTableRow from '../../Components/CustomTableRow'
import Camera from '../../Components/Camera'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { CustomInput, DropDownHolder } from '../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled, CustomDatepicker } from 'react-native-awesome-component'
import OrderActions from '../../Redux/OrderRedux'
import { Method } from 'react-native-awesome-component';

const schema = Yup.object().shape({
    noFaktur: Yup.string(),
    tanggal: Yup.string(),
    namaCustomer: Yup.string()
        .required("Nama Customer harus diisi."),
    alamat: Yup.string()
        .required("Alamat harus diisi."),
    telephone: Yup.string()
        .required("Telepon harus diisi."),
    // keterangan: Yup.string()
    //     .required("Keterangan harus diisi."),
    penerima: Yup.string()
        .required("Penerima harus diisi."),
})



class DetailOrderScreen extends Component {
    camera = undefined
    constructor(props) {
        super(props)
        this.state = {
            dataCamera: '',
            uri: '',
            errorFoto: false
        }

        const { dataOrder } = props

        this.initialValue = {
            noFaktur: dataOrder && dataOrder.No_Penjualan ? dataOrder.No_Penjualan : '-',
            telephone: dataOrder && dataOrder.No_Telepon ? dataOrder.No_Telepon : '-',
            tanggal: moment(new Date()).format('DD-MM-YYYY'),
            namaCustomer: dataOrder && dataOrder.Nama_Customer ? dataOrder.Nama_Customer : '-',
            // keterangan: 'abcd',
            alamat: dataOrder && dataOrder.Alamat ? dataOrder.Alamat : '-',
            pembayaran: dataOrder && dataOrder.Id_Jenis_Pembayaran
                ? dataOrder.Id_Jenis_Pembayaran === 1 ? 'Tunai/COD' : 'Transfer' : '-',
            ongkir: dataOrder && dataOrder.Ongkos_Kirim ? dataOrder.Ongkos_Kirim : '-'
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderMasPantes />),
        headerStyle: {
            elevation: 0,
            height: Scale(70),
            backgroundColor: Colors.goldBasic,
            shadowOpacity: 0,
            borderBottomWidth: 0
        }
    })

    handleSubmit(values, actions) {
        const { dataCamera } = this.state
        const { user, barangSampaiRequest } = this.props
        if (dataCamera !== '') {
            const param = {
                No_Penjualan: values.noFaktur,
                Jam_Terima: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                Url_Foto_Penerima: `data:image/jpeg;base64,${dataCamera.base64}`,
                Nama_Penerima: values.penerima,
                Kurir_Id: user.Id_Kurir
            }
            Method.LoadingHelper.showLoading()
            barangSampaiRequest(param)
        }
    }

    setDataCamera = (data) => {
        this.setState({ dataCamera: data, uri: data.uri })
    }

    confirm = (props) => {
        if (this.state.dataCamera === '') {
            this.setState({ errorFoto: true })
        } else {
            this.setState({ errorFoto: false })
        }
        props.handleSubmit()
    }

    reject = () => {
        DropDownHolder.alert('error', 'Function belum tersedia', 'Mohon maaf, fungsi ini masih dalam tahap pengembangan, API belum tersedia')
    }

    renderDetailViewOnly = () => {
        const { dataOrder } = this.props
        let namaPenerima = '-'

        if (dataOrder && dataOrder.Nama_Penerima) {
            namaPenerima = dataOrder.Nama_Penerima
        }

        return (
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Penerima</Text>
                    <Text style={styles.textInfo}>:  {namaPenerima} </Text>
                </View>
                <Text style={styles.labelStyle}>Foto Penerima</Text>
                {dataOrder && dataOrder.Url_Foto_Penerima &&
                    <Image
                        style={[styles.photoView, { marginBottom: 15 }]}
                        resizeMode="contain"
                        source={{
                            uri: dataOrder.Url_Foto_Penerima,
                        }}
                        resizeMethod={'resize'}
                        resizeMode={'cover'}
                    />
                }
            </View>
        )
    }

    renderForm = (props) => {
        const { uri } = this.state
        const { barang, dataOrder } = this.props
        let namaPenerima = '-'

        if (dataOrder && dataOrder.Nama_Kurir) {
            namaPenerima = dataOrder.Nama_Kurir
        }
        return (
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
                                    editable={false}
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
                        <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                <Text style={styles.labelStyle}>Alamat</Text>
                                <Text style={styles.labelStyle2}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.formAlamat}
                                    placeholder='Alamat'
                                    multiline={true}
                                    editable={false}
                                    autoCorrect={false}
                                    defaultValue={props.values.alamat}
                                    onChangeText={(value) => props.setFieldValue('alamat', value)}
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
                                    returnKeyType="go"
                                    editable={false}
                                    maxLength={15}
                                    placeholder={'Telepon'}
                                    setFieldValue={props.setFieldValue}
                                    value={props.values.telephone}
                                    error={props.errors.telephone}
                                    styleTitle={styles.formLabelText}
                                    styleInputText={styles.formPlacholderText}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.labelStyle}>Pembayaran</Text>
                                <Text style={styles.labelStyle2}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    name="telephone"
                                    returnKeyType="go"
                                    editable={false}
                                    maxLength={15}
                                    placeholder={'Telepon'}
                                    setFieldValue={props.setFieldValue}
                                    value={props.values.pembayaran}
                                    error={props.errors.pembayaran}
                                    styleTitle={styles.formLabelText}
                                    styleInputText={styles.formPlacholderText}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.labelStyle}>Ongkos Kirim</Text>
                                <Text style={styles.labelStyle2}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    name="telephone"
                                    returnKeyType="go"
                                    editable={false}
                                    maxLength={15}
                                    placeholder={'Telepon'}
                                    setFieldValue={props.setFieldValue}
                                    value={props.values.ongkir}
                                    error={props.errors.ongkir}
                                    styleTitle={styles.formLabelText}
                                    styleInputText={styles.formPlacholderText}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.labelStyle}>Estimasi Sampai</Text>
                                <Text style={styles.labelStyle2}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    name="telephone"
                                    returnKeyType="go"
                                    editable={false}
                                    maxLength={15}
                                    placeholder={'Telepon'}
                                    setFieldValue={props.setFieldValue}
                                    value={'-'}
                                    error={props.errors.ongkir}
                                    styleTitle={styles.formLabelText}
                                    styleInputText={styles.formPlacholderText}
                                />
                            </View>
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.labelStyle}>Ket.</Text>
                                <Text style={styles.labelStyle2}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    name="keterangan"
                                    returnKeyType="go"
                                    editable={false}
                                    maxLength={15}
                                    placeholder={'Keterangan'}
                                    setFieldValue={props.setFieldValue}
                                    value={props.values.keterangan}
                                    error={props.errors.keterangan}
                                    styleTitle={styles.formLabelText}
                                    styleInputText={styles.formPlacholderText}
                                />
                            </View>
                        </View> */}
                    </View>
                    {/* {this.renderSearchBar()} */}
                    <CustomTableRow
                        disableEdit={true}
                        onPressEdit={(data) => this.props.navigation.navigate('EditBarang', { data })}
                        onDeleteData={(id) => this.deleteDataBarang(id)}
                        data={barang} />
                    <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 20 }}>
                        <Text style={styles.labelStyle}>Kurir</Text>
                        <Text style={styles.textInfo}>:  {namaPenerima} </Text>
                    </View>
                    {!dataOrder.viewOnly &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.labelStyle}>Penerima</Text>
                                <Text style={styles.textInfo}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    name="penerima"
                                    returnKeyType="go"
                                    maxLength={15}
                                    placeholder={'Nama Penerima'}
                                    setFieldValue={props.setFieldValue}
                                    value={props.values.penerima}
                                    error={props.errors.penerima}
                                    styleTitle={styles.formLabelTextDisable}
                                    styleInputText={styles.formPlacholderTextDisable}
                                />
                            </View>
                        </View>}
                    {!dataOrder.viewOnly &&
                        <TouchableOpacity onPress={() => this.camera.show()} style={uri === '' ? styles.photoContainer : styles.photoContainerNoBorder}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                {uri !== '' ?
                                    <Image
                                        source={{ uri: uri, isStatic: true }}
                                        style={styles.photo}
                                    />
                                    :
                                    <Image source={Images.camera} style={styles.uploadIcon} />
                                }
                                {uri === '' ?
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={styles.icPhoto}>Foto penerima</Text>
                                        <Text style={styles.uploadPhoto}>Tap untuk mangambil foto</Text>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={() => this.camera.show()} style={{ justifyContent: 'center' }}>
                                        <Text style={styles.changePhoto}>Ubah Foto Penerima</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </TouchableOpacity>
                    }

                    {!dataOrder.viewOnly &&
                        <View style={{ marginBottom: 7 }}>
                            {this.state.errorFoto ? (
                                <Text style={styles.textError}>
                                    Foto harus diisi
                                </Text>
                            ) : (
                                    <Text style={styles.textError} />
                                )}
                        </View>}
                    {!dataOrder.viewOnly &&
                        <View style={{ marginVertical: 20 }}>
                            <TouchableOpacity
                                onPress={() => this.confirm(props)}
                                style={styles.terimaButton}>
                                <Text style={styles.terimaText}>Terima</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                onPress={this.reject}
                                style={styles.rejectButton}>
                                <Text style={styles.rejectText}>Reject</Text>
                            </TouchableOpacity> */}
                        </View>
                    }

                    {dataOrder.viewOnly && this.renderDetailViewOnly()}
                </Styled.Container>
            </KeyboardAwareScrollView>
        )
    }

    render() {
        const { dataOrder } = this.props
        let jamKemas = '-'
        let jamKirim = '-'
        let jamTerima = '-'

        if (dataOrder && dataOrder.Jam_Kemas) {
            jamKemas = moment(dataOrder.Jam_Kemas, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')
        }

        if (dataOrder && dataOrder.Jam_Kirim) {
            jamKirim = moment(dataOrder.Jam_Kirim, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')
        }

        if (dataOrder && dataOrder.Jam_Terima) {
            jamTerima = moment(dataOrder.Jam_Terima, 'YYYY-MM-DD hh:mm:ss').format('DD MMM YYYY, hh:mm')
        }

        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
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
                <View style={styles.bottomInfo}>
                    <Text style={styles.textKemas}>Jam Kemas: {'\n'} {jamKemas}</Text>
                    <Text style={styles.textKemas}>Jam Kirim: {'\n'} {jamKirim}</Text>
                    <Text style={styles.textKemas}>Jam Terima: {'\n'} {jamTerima}</Text>
                </View>

                <Camera
                    setRef={r => this.camera = r}
                    onCapture={(data) => this.setDataCamera(data)} />
            </View>
        )
    }
}

const mapStateToProps = (state, props) => {
    const dataOrder = props.navigation.getParam('data')
    console.tron.error({ dataOrder })

    let barang = []
    if (dataOrder && dataOrder.isSales) {
        console.tron.error('console cude')
        const { Detail_Barang } = dataOrder
        for (let i = 0; i < Detail_Barang.length; i++) {
            barang.push({
                no: i + 1,
                Nama_Barang: Detail_Barang[i].Nama_Barang,
                harga: Detail_Barang[i].Harga,
                foto: Detail_Barang[i].Url_Foto_Barang,
            })
        }
    } else {
        const { Order_Detail } = dataOrder
        for (let i = 0; i < Order_Detail.length; i++) {
            barang.push({
                no: i + 1,
                Nama_Barang: Order_Detail[i].Nama_Barang,
                harga: Order_Detail[i].Harga,
                foto: Order_Detail[i].Url_Foto_Barang,
            })
        }
    }

    return {
        user: state.session.userSession,
        dataOrder,
        barang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        barangSampaiRequest: (param) => dispatch(OrderActions.barangSampaiRequest(param))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderScreen)
