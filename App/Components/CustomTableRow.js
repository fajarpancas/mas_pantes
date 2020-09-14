import React, { Component } from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import { Colors, Fonts, Images } from '../Themes'
import Scale from '../Transforms/Scale'

class CustomTableRow extends Component {
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

    renderTableValue = ({ no, Nama_Barang }) => {
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

    renderEmpty = () => {
        return (
            <View>
                <Image
                    source={Images.emptyTrans}
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    style={{ width: Scale(100) }} />
            </View>
        )
    }

    render() {
        const { data } = this.props
        return (
            <View>
                {this.renderTableHeader()}
                {data.length > 0 ? data.map(this.renderTableValue) :
                    this.renderEmpty()}
                {this.renderTableTotal()}
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
        width: Scale(150),
        justifyContent: 'center',
    },
    borderTableFoto: {
        marginHorizontal: Scale(-0.5),
        borderColor: Colors.goldBasic,
        backgroundColor: Colors.goldBasic,
        paddingVertical: 10,
        borderWidth: 1,
        width: Scale(80),
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
        width: Scale(150),
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
        width: Scale(80),
        justifyContent: 'center',
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
}

export default CustomTableRow;
