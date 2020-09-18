import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    modalDeleteWrapper: {
        width: Scale(300),
        height: 'auto',
        paddingHorizontal: Scale(20),
        paddingTop: Scale(20),
        paddingBottom: Scale(10),
        backgroundColor: Colors.white,
        alignSelf: 'center',
        borderRadius: 10
    },
    message: {
        fontFamily: Fonts.type.acuminProRegular,
        fontSize: 14,
        color: Colors.textGrey,
        textAlign: 'center',
        lineHeight: 20,
        marginHorizontal: 30
    },
    titleEstimasi: {
        fontFamily: Fonts.type.acuminProRegular,
        fontSize: 15,
        color: Colors.textGrey,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 10
    },
    title: {
        fontFamily: Fonts.type.acuminProBold,
        fontSize: 18,
        color: Colors.textGrey,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 10
    },
    deleteButton: {
        backgroundColor: Colors.alertError,
        marginTop: 20,
        height: Scale(40),
        borderRadius: 5,
        justifyContent: 'center'
    },
    deleteText: {
        fontFamily: Fonts.type.acuminProMedium,
        color: Colors.white,
        fontSize: 13,
        textAlign: 'center'
    },
    kembaliButton: {
        backgroundColor: Colors.white,
        height: Scale(40),
        borderRadius: 5,
        justifyContent: 'center'
    },
    kembaliText: {
        fontFamily: Fonts.type.acuminProMedium,
        color: Colors.textGrey,
        fontSize: 13,
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: Colors.alertSuccess,
        marginTop: 20,
        height: Scale(40),
        borderRadius: 5,
        justifyContent: 'center'
    }
})
