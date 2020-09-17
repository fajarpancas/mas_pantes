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
import PhoneRegion from '../../Containers/Auth/PhoneRegion'
import moment from 'moment'
import { CustomInput } from '../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled, CustomDatepicker } from 'react-native-awesome-component'

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
    penerima: Yup.string()
        .required("Penerima harus diisi."),
})

const initialValue = {
    noFaktur: 'abcd2372736236276',
    phoneCode: '+62',
    tanggal: moment(new Date()).format('DD-MM-YYYY'),
    namaCustomer: 'Fajar',
    sales: 'Panca',
    telephone: '87847635259',
    keterangan: 'abcd',
    kurir: 'Akmal',
    alamat: 'Jl. Golf Cipanjalu no.42 RT.01 RW.11, Kec. Arcamanik, Kel.Cisaranten Binaharapan, Kota Bandung'
}

class DetailOrderScreen extends Component {
    camera = undefined
    constructor(props) {
        super(props)
        this.state = {
            dataCamera: '',
            uri: ''
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
        // this.props.navigation.navigate('AppSales')
    }

    setDataCamera = (data) => {
        this.setState({ dataCamera: data, uri: data.uri })
    }

    renderForm = (props) => {
        const { uri } = this.state
        let barang = [
            { no: 1, Nama_Barang: 'Tes barang', harga: '2000000' },
            { no: 2, Nama_Barang: 'Tes barang 2', harga: '1500000' }
        ]
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
                                    title={'No. Telepon'}
                                    editable={false}
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
                        </View>
                    </View>
                    {/* {this.renderSearchBar()} */}
                    <CustomTableRow
                        disableEdit={true}
                        onPressEdit={(data) => this.props.navigation.navigate('EditBarang', { data })}
                        onDeleteData={(id) => this.deleteDataBarang(id)}
                        data={barang} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginHorizontal: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.labelStyle}>Penerima</Text>
                            <Text style={styles.labelStyle2}>:</Text>
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
                    </View>
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
                    <TouchableOpacity style={styles.terimaButton}>
                        <Text style={styles.terimaText}>Terima</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton}>
                        <Text style={styles.terimaText}>Reject</Text>
                    </TouchableOpacity>
                </Styled.Container>
            </KeyboardAwareScrollView>
        )
    }

    render() {
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
                        initialValues={initialValue}
                    />
                </View>
                <View style={styles.bottomInfo}>
                    <Text style={styles.textKemas}>Kemas: 08.00 wib</Text>
                    <Text style={styles.textKemas}>Kirim: 09.00 wib</Text>
                    <Text style={styles.textKemas}>Terima: - wib</Text>
                </View>


                <Camera
                    setRef={r => this.camera = r}
                    onCapture={(data) => this.setDataCamera(data)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderScreen)
