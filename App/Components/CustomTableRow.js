import React, { Component } from 'react'
import {
    View,
    Text,
    Image, TouchableOpacity
} from 'react-native'
import { Colors, Fonts, Images } from '../Themes'
import Scale from '../Transforms/Scale'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { EmptyContent } from '../Components'
import CustomModalDelete from '../Components/CustomModalDelete'

class CustomTableRow extends Component {
    deleteModal = undefined

    constructor(props) {
        super(props)
        this.state = {
            idBarang: undefined
        }
    }

    showPopUp = (id) => {
        this.setState({ idBarang: id }, () => {
            this.deleteModal.show()
        })
    }

    deleteData = (id) => {
        this.props.onDeleteData(id)
    }

    toEditScreen = (id, nama, harga) => {
        const data = {
            id,
            nama,
            harga
        }
        this.props.onPressEdit(data)
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
                    <Text style={styles.valueTable}>Harga(Rp.)</Text>
                </View>
                <View style={styles.borderTableFoto}>
                    <Text style={styles.valueTable}>Aksi</Text>
                </View>
            </View>
        )
    }

    renderTableTotal = (total) => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableTotal}>
                    <Text style={styles.valueTable}>Total</Text>
                </View>
                <View style={styles.borderTableTotal}>
                    <Text style={styles.valueTable}>Rp. {total}</Text>
                </View>
            </View>
        )
    }

    renderTableValue = ({ id, no, Nama_Barang, harga }) => {
        return (
            <View style={styles.headerTable}>
                <View style={styles.borderTableNoValue}>
                    <Text style={styles.valueTableFill}>{no}</Text>
                </View>
                <View style={styles.borderTableNamaBarangValue}>
                    <Text style={styles.valueTableFill}>{Nama_Barang}</Text>
                </View>
                <View style={styles.borderTableHargaValue}>
                    <Text style={styles.valueTableFill}>{harga}</Text>
                </View>
                <View style={styles.borderTableFotoValue}>
                    <TouchableOpacity
                        onPress={() => this.toEditScreen(id, Nama_Barang, harga)}
                        style={{ marginRight: 10 }}>
                        <Icons name='edit' size={20} color={'grey'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.showPopUp(id)}>
                        <Icons name='delete' size={20} color={'grey'} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    renderEmpty = () => {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: Scale(10),
                borderLeftColor: Colors.borderGrey,
                borderRightColor: Colors.borderGrey,
                borderLeftWidth: 1,
                borderRightWidth: 1,
            }}>
                <EmptyContent title={'Tidak Ada Data'} message={'Data barang masih kosong'} />
            </View>
        )
    }

    render() {
        const { data } = this.props
        let total = 0

        for (let i = 0; i < data.length; i++) {
            total = total + parseInt(data[i].harga)
        }

        return (
            <View>
                {this.renderTableHeader()}
                {data.length > 0 ? data.map(this.renderTableValue) :
                    this.renderEmpty()}
                {this.renderTableTotal(total)}

                <CustomModalDelete
                    type={'delete'}
                    title={'Hapus Barang'}
                    confirmText={'Ya, Hapus'}
                    onConfirm={() => this.deleteData(this.state.idBarang)}
                    idBarang={this.state.idBarang}
                    message={'Apakah anda yakin ingin menghapus barang ini?'}
                    setRef={r => this.deleteModal = r}
                />
            </View>
        )
    }
}

const styles = {
    headerTable: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    borderTableNo: {
        marginHorizontal: Scale(-0.5),
        borderColor: Colors.goldBasic,
        backgroundColor: Colors.goldBasic,
        paddingVertical: 10,
        borderWidth: 1,
        width: Scale(40),
        justifyContent: 'center',
    },
    borderTableNamaBarang: {
        marginHorizontal: Scale(-0.5),
        borderColor: Colors.goldBasic,
        backgroundColor: Colors.goldBasic,
        paddingVertical: 10,
        borderWidth: 1,
        width: Scale(130),
        justifyContent: 'center',
    },
    borderTableFoto: {
        marginHorizontal: Scale(-0.5),
        borderColor: Colors.goldBasic,
        backgroundColor: Colors.goldBasic,
        paddingVertical: 10,
        borderWidth: 1,
        width: Scale(100),
        justifyContent: 'center',
    },
    borderTableHarga: {
        marginHorizontal: Scale(-0.5),
        borderColor: Colors.goldBasic,
        backgroundColor: Colors.goldBasic,
        paddingVertical: 10,
        borderWidth: 1,
        width: Scale(80),
        justifyContent: 'center',
    },
    valueTable: {
        fontSize: 12,
        color: Colors.white,
        fontFamily: Fonts.type.acuminProRegular,
        textAlign: 'center'
    },
    borderTableNoValue: {
        marginHorizontal: Scale(-0.5),
        borderBottomColor: 'lightgrey',
        borderLeftColor: 'lightgrey',
        borderRightColor: 'lightgrey',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: Scale(40),
        justifyContent: 'center',
    },
    borderTableNamaBarangValue: {
        marginHorizontal: Scale(-0.5),
        borderBottomColor: 'lightgrey',
        borderLeftColor: 'lightgrey',
        borderRightColor: 'lightgrey',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: Scale(130),
        justifyContent: 'center',
    },
    borderTableFotoValue: {
        marginHorizontal: Scale(-0.5),
        borderBottomColor: 'lightgrey',
        borderLeftColor: 'lightgrey',
        borderRightColor: 'lightgrey',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: Scale(100),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    borderTableHargaValue: {
        marginHorizontal: Scale(-0.5),
        borderBottomColor: 'lightgrey',
        borderLeftColor: 'lightgrey',
        borderRightColor: 'lightgrey',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: Scale(80),
        justifyContent: 'center',
    },
    valueTableFill: {
        fontSize: 12,
        color: Colors.textGrey,
        fontFamily: Fonts.type.acuminProRegular,
        textAlign: 'center'
    },
    borderTableTotal: {
        marginHorizontal: Scale(-0.5),
        borderBottomColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        backgroundColor: Colors.goldBasic,
        flex: 1,
        justifyContent: 'center',
    },
    emptyBarang: {
        fontFamily: Fonts.type.acuminProMedium,
        color: Colors.textGrey,
        textAlign: 'center',
        marginTop: 5
    }
}

export default CustomTableRow;
