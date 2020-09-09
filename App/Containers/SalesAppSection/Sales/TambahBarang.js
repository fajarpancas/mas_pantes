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
    namaBarang: Yup.string()
        .required("Nama barang harus diisi."),
    harga: Yup.string()
        .required("Harga barang harus diisi."),
})

const initialValue = {
}

class TambahBarang extends Component {
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

    handleSubmit(values, actions) {

    }

    renderForm = (props) => {
        console.tron.error({ props })
        return (
            <KeyboardAwareScrollView extraScrollHeight={40}>
                <Styled.Container style={{ borderRadius: 10, marginHorizontal: 5, marginTop: 5 }}>
                    <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
                        <CustomInput
                            label
                            name="namaBarang"
                            title={'Nama Barang'}
                            autoCapitalize="none"
                            returnKeyType="go"
                            maxLength={15}
                            placeholder={'Masukkan nama barang'}
                            secureTextEntry={true}
                            setFieldValue={props.setFieldValue}
                            value={props.values.namaBarang}
                            error={props.errors.namaBarang}
                            styleTitle={styles.formLabelTextTambah}
                            styleInputText={styles.formPlacholderTextTambah}
                        />
                        <CustomInput
                            label
                            name="harga"
                            title={'Harga Barang'}
                            autoCapitalize="none"
                            returnKeyType="go"
                            maxLength={15}
                            placeholder={'Masukkan harga barang'}
                            secureTextEntry={true}
                            setFieldValue={props.setFieldValue}
                            value={props.values.harga}
                            error={props.errors.harga}
                            styleTitle={styles.formLabelTextTambah}
                            styleInputText={styles.formPlacholderTextTambah}
                        />
                    </View>
                </Styled.Container>
            </KeyboardAwareScrollView>
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
                <TouchableOpacity style={styles.tambahButton}>
                    <Text style={styles.cariText}>TAMBAH</Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(TambahBarang)
