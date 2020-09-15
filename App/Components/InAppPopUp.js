import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { Fonts, Colors } from '../Themes'
import Scale from '../Transforms/Scale'
import PopupHolder from '../Lib/PopupHolder'

const styles = StyleSheet.create({
    confirmDeleteButton: {
        backgroundColor: Colors.deleteButton,
        width: Scale(213),
        height: 40,
        borderRadius: 3,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 6
    },
    confirmDeleteText: {
        fontFamily: Fonts.type.azoSansBold,
        fontSize: 14,
        textAlign: 'center',
        color: Colors.white,
        textTransform: 'uppercase'
    },
    deleteModal: {
        backgroundColor: Colors.white,
        width: Scale(273),
        borderRadius: 10,
        height: 'auto',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15
    },
    deleteText: {
        fontFamily: Fonts.type.azoSansMedium,
        fontSize: 20,
        color: Colors.textBlack,
        textAlign: 'center'
    },
    deleteDesc: {
        marginTop: 10,
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: Fonts.type.azoSansRegular,
        fontSize: 14,
        color: '#777777',
        lineHeight: 17
    },
    deleteContainer: {
        height: 40,
        justifyContent: 'center'
    },
    cancelText: {
        fontFamily: Fonts.type.azoSansRegular,
        fontSize: 14,
        color: '#555555',
        textAlign: 'center'
    }
})

class InAppPopup extends PureComponent {

    popupType = undefined

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)

        this.getPopUpMessage = this.getPopUpMessage.bind(this)

        this.onConfirm = this.onConfirm.bind(this)
    }

    // componentDidMount() {
    //     PopupHolder.setInstance(this)
    // }

    getPopUpMessage() {
        let info = {
            title: 'Title',
            message: 'Message'
        }
        return info
    }

    show(type) {
        this.popupType = type
        this.setState({ visible: true })
    }

    hide() {
        this.setState({ visible: false }, () => {
            this.popupType = undefined
        })
    }

    onConfirm() {
        this.hide()
    }

    render() {
        const { visible } = this.state
        let info = this.getPopUpMessage()

        return (
            <Modal
                isVisible={visible}
                onBackButtonPress={this.hide}
                onBackdropPress={this.hide}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                backdropTransitionOutTiming={0}
            >
                <View style={styles.deleteModal}>
                    <Text style={styles.deleteText}>{info.title}</Text>
                    <Text style={styles.deleteDesc}>{info.message}</Text>
                    < TouchableOpacity
                        style={styles.deleteContainer}
                        onPress={this.onConfirm}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.cancelText}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal >
        )
    }
}

export default InAppPopup