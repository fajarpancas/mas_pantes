import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import styles from './Styles/ModalDeleteStyle'
import NavigationServices from '../Services/NavigationServices'
import { Images } from '../Themes'
import { connect } from 'react-redux'

class CustomModalDelete extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.confirm = this.confirm.bind(this)
    }

    componentDidMount() {
        const { setRef } = this.props

        if (typeof setRef === 'function') {
            setRef({
                show: this.show,
                hide: this.hide,
            })
        }
    }

    show() {
        this.setState({ isVisible: true })
    }

    hide() {
        this.setState({ isVisible: false })
    }

    confirm() {
        this.hide()
        this.props.onConfirm()
    }

    render() {
        const { isVisible } = this.state
        return (
            <Modal
                onBackButtonPress={this.hide}
                onBackdropPress={this.hide}
                backdropTransitionOutTiming={0}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                isVisible={isVisible}>
                <View style={styles.modalDeleteWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.message}>{this.props.message}</Text>
                    <TouchableOpacity
                        onPress={this.confirm}
                        style={styles.deleteButton}>
                        <Text style={styles.deleteText}>{this.props.confirmText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.hide}
                        style={styles.kembaliButton}>
                        <Text style={styles.kembaliText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModalDelete)