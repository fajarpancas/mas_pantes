import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { Colors, Fonts } from '../Themes'

class HeaderMasPantes extends Component {
    render() {
        return (
            <View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.textTokoMas}>TOKO MAS PANTES</Text>
                </View>
                <View style={styles.headerWrapperCabang}>
                    <Text style={styles.textCabang}>Cabang : Garage City Mall</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    headerWrapper: {
        paddingTop: 8,
        backgroundColor: Colors.goldBasic
    },
    headerWrapperCabang: {
        paddingBottom: 10,
        backgroundColor: Colors.goldBasic,
        borderBottomColor: Colors.goldBasic,
        borderBottomWidth: 1
    },
    textTokoMas: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 18,
        fontFamily: Fonts.type.acuminProBold,
        color: Colors.white
    },
    textCabang: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: Fonts.type.acuminProRegular,
        color: Colors.white
    }
}

export default HeaderMasPantes;
