import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts, Images } from '../../../Themes'
import styles from '../../Styles/SalesScreenStyle'
import { CustomInput } from '../../../Components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled } from 'react-native-awesome-component'
import Scale from '../../../Transforms/Scale'
import OrderActions from '../../../Redux/OrderRedux'
import Camera from '../../../Components/Camera'

const schema = Yup.object().shape({
    namaBarang: Yup.string()
        .required("Nama barang harus diisi."),
    harga: Yup.string()
        .required("Harga barang harus diisi."),
})

const initialValue = {
}

class TambahBarang extends Component {
    camera = undefined
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Tambah Barang',
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

    constructor(props) {
        super(props)
        this.state = {
            dataCamera: '',
            uri: '',
            errorFoto: false
        }
    }

    submit = (props) => {
        props.handleSubmit()
        if (this.state.uri === '') {
            this.setState({ errorFoto: true })
        } else {
            this.setState({ errorFoto: false })
        }
    }

    handleSubmit(values, actions) {
        const { uploadFotoBarang } = this.props
        const { payload } = uploadFotoBarang
        let url = ''
        let foto = ''

        if (payload && payload.Url) {
            url = payload.Url
        }

        if (payload && payload.Nama_Foto) {
            foto = payload.Nama_Foto
        }

        if (payload) {
            const randomA = Math.floor(Math.random() * 100000) + 1
            const randomB = Math.floor(Math.random() * 100000) + 1

            const params = {
                id: 'B' + randomA.toString() + randomB.toString(),
                Nama_Barang: values.namaBarang,
                harga: values.harga,
                foto: url,
                nameFoto: foto
            }

            this.props.addBarangRequest(params)
        }
    }

    setDataCamera = (data) => {
        const { uploadFotoBarangRequest } = this.props
        this.setState({ dataCamera: data, uri: data.uri })
        const param = {
            Url_Foto_Barang: `data:image/jpeg;base64,${data.base64}`,
        }
        uploadFotoBarangRequest(param)
    }

    renderForm = (props) => {
        const { uri } = this.state
        const { uploadFotoBarang } = this.props
        const { fetching, error, payload } = uploadFotoBarang
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 15, flex: 1, paddingTop: 15 }}>
                    <KeyboardAwareScrollView extraScrollHeight={40}>
                        <Styled.Container style={{ borderRadius: 10, marginHorizontal: 5, marginTop: 5 }}>
                            <CustomInput
                                label
                                name="namaBarang"
                                title={'Nama Barang'}
                                returnKeyType="go"
                                maxLength={15}
                                placeholder={'Masukkan nama barang'}
                                setFieldValue={props.setFieldValue}
                                value={props.values.namaBarang}
                                error={props.errors.namaBarang}
                                styleTitle={styles.formLabelTextTambah}
                                styleInputText={styles.formPlacholderTextTambah}
                            />
                            <CustomInput
                                label
                                name="harga"
                                keyboardType={'numeric'}
                                title={'Harga Barang'}
                                returnKeyType="go"
                                maxLength={15}
                                placeholder={'Masukkan harga barang'}
                                setFieldValue={props.setFieldValue}
                                value={props.values.harga}
                                error={props.errors.harga}
                                styleTitle={styles.formLabelTextTambah}
                                styleInputText={styles.formPlacholderTextTambah}
                                renderLeft={() => {
                                    return (
                                        <Text style={styles.rupiah}>Rp. </Text>
                                    )
                                }}
                            />
                            <Text style={styles.formLabelTextTambah}>Foto Barang</Text>
                            <TouchableOpacity
                                onPress={() => this.camera.show()}
                                disabled={uri !== ''}
                                style={uri === '' ? styles.photoContainer : styles.photoContainerNoBorder}>
                                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        {fetching ?
                                            <ActivityIndicator
                                                style={{
                                                    position: 'absolute',
                                                    zIndex: 1,
                                                    alignSelf: 'center'
                                                }}
                                                size={Scale(60)} color={'#57A9DD'} />
                                            : null
                                        }
                                        {uri !== '' ?
                                            <Image
                                                source={{ uri: uri, isStatic: true }}
                                                style={styles.photo}
                                            />
                                            :
                                            <Image source={Images.camera} style={styles.uploadIcon} />
                                        }
                                    </View>

                                    {uri === '' ?
                                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={styles.uploadPhoto}>Tap untuk mangambil foto</Text>
                                        </View>
                                        :
                                        !fetching ?
                                            <TouchableOpacity onPress={() => this.camera.show()} style={{ justifyContent: 'center' }}>
                                                <Text style={styles.changePhoto}>Ubah Foto Barang</Text>
                                            </TouchableOpacity> : null
                                    }
                                </View>
                            </TouchableOpacity>
                            {
                                fetching &&
                                <Text style={styles.unggah}>Mengunggah foto barang...</Text>
                            }

                            {
                                !fetching && error &&
                                <Text style={styles.unggahGagal}>Unggah foto gagal</Text>
                            }

                            {
                                !fetching && payload &&
                                <Text style={styles.unggah}>Unggah foto berhasil</Text>
                            }

                            <View style={{ marginBottom: 7 }}>
                                {this.state.errorFoto ? (
                                    <Text style={styles.textError}>
                                        Foto harus diisi
                                    </Text>
                                ) : (
                                        <Text style={styles.textError} />
                                    )}
                            </View>
                        </Styled.Container>
                    </KeyboardAwareScrollView>
                </View>
                <TouchableOpacity onPress={() => this.submit(props)} style={styles.tambahButton}>
                    <Text style={styles.cariText}>TAMBAH</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Formik
                        ref={ref => { this.formik = ref }}
                        onSubmit={this.handleSubmit.bind(this)}
                        validationSchema={schema}
                        render={this.renderForm.bind(this)}
                        validateOnChange={false}
                        initialValues={initialValue}
                    />
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
        uploadFotoBarang: state.order.uploadFotoBarang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFotoBarangRequest: (param) => dispatch(OrderActions.uploadFotoBarangRequest(param)),
        addBarangRequest: (params) => dispatch(OrderActions.addBarangRequest(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TambahBarang)
