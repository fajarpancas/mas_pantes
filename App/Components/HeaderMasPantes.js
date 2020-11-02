import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
} from 'react-native'
import { Colors, Fonts } from '../Themes'

class HeaderMasPantes extends Component {
    render() {
        const { user } = this.props
        let namaToko = '-'

        if (user && user.Nama_Toko) {
            namaToko = user.Nama_Toko
        }
        return (
            <View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.textTokoMas}>TOKO MAS PANTES</Text>
                </View>
                <View style={styles.headerWrapperCabang}>
                    <Text style={styles.textCabang}>Cabang : {namaToko}</Text>
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

const mapStateToProps = (state) => {
    return {
        user: state.session.userSession,
    }
}

export default connect(mapStateToProps, null)(HeaderMasPantes)
