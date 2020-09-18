import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../../../Themes'
import styles from '../../Styles/SalesScreenStyle'
import { CustomInput } from '../../../Components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Styled } from 'react-native-awesome-component'
import Scale from '../../../Transforms/Scale'
import OrderActions from '../../../Redux/OrderRedux'

const schema = Yup.object().shape({
    id: Yup.string(),
    namaBarang: Yup.string()
        .required("Nama barang harus diisi."),
    harga: Yup.string()
        .required("Harga barang harus diisi."),
})

class EditBarang extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Edit Barang',
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
        const dataEdit = props.navigation.getParam('data')
        this.initialValue = {
            id: dataEdit.id,
            namaBarang: dataEdit.nama,
            harga: dataEdit.harga
        }
    }

    handleSubmit(values, actions) {
        const params = {
            id: values.id,
            Nama_Barang: values.namaBarang,
            harga: values.harga
        }
        console.tron.error({ params })

        this.props.editBarangRequest(params)
    }

    renderForm = (props) => {
        console.tron.error({ props })
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
                        </Styled.Container>
                    </KeyboardAwareScrollView>
                </View>
                <TouchableOpacity onPress={props.handleSubmit} style={styles.tambahButton}>
                    <Text style={styles.cariText}>EDIT</Text>
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
                        initialValues={this.initialValue}
                    />
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
        editBarangRequest: (params) => dispatch(OrderActions.editBarangRequest(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBarang)
