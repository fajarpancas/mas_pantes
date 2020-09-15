import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Modal, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Fonts, Colors, Images } from '../../Themes'
import Styles from '../Styles/SignInScreenStyle'

const OS = Platform.OS

const PHONE_REGION = [
    { label: '+60 Malaysia', value: '+60' },
    { label: '+62 Indonesia', value: '+62' },
    { label: '+65 Singapore', value: '+65' }
]

export default class PhoneRegion extends Component {

    state = {
        visible: false,
        selected: null,
        value: PHONE_REGION[0]
    }

    showModal = () => {
        this.setState({ visible: !this.state.visible })
    }

    renderItem = (item, index) => {
        const selected = (this.state.selected && this.state.selected.value == item.value)

        return (
            <TouchableOpacity
                key={index}
                style={Styles.containerMenu}
                onPress={() => {
                    this.setState({ selected: item })
                }}
            >
                <View style={styles.contentMenu} >
                    <Text style={styles.textTitleSetting}>{item.label}</Text>
                    {
                        selected
                            ? <Icon name='done' color={Colors.darkBlue} size={20} />
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    onSubmitSelect = () => {
        console.log(this.state.selected)
        if (this.state.selected !== null) {
            this.setState({ visible: false, value: this.state.selected })
            this.props.onSubmit(this.state.selected)
        }
    }

    renderModal = () => {
        return (
            <Modal visible={this.state.visible}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15, paddingTop: (OS == 'ios' ? 20 : 0) }}>
                    <TouchableOpacity onPress={this.showModal}>
                        <Icon name='arrow-back' size={25} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onSubmitSelect()}>
                        <Icon name='check' size={25} color={'black'} />
                    </TouchableOpacity>
                </View>
                {/* <CustomHeader
          onPressLeft={this.showModal}
          // iconRight={'check'}
          onPressRight={() => {
            this.setState({ visible: false, value: this.state.selected })
            this.props.onSubmit(this.state.selected)
          }}
        /> */}
                <View>
                    {PHONE_REGION && PHONE_REGION.map(this.renderItem)}
                </View>
            </Modal>
        )
    }

    render() {
        const { editable } = this.props
        return (
            <View>
                <TouchableOpacity style={styles.contentPicker} disabled={!editable} onPress={this.showModal}>
                    <Text style={styles.textRegion}>{this.props.value}</Text>
                    <Icon name="arrow-drop-down" size={20} />
                </TouchableOpacity>
                {this.renderModal()}
            </View>

        )
    }
}

PhoneRegion.defaultProps = {
    onSubmit: () => { },
    value: PHONE_REGION[0].value
}


const styles = {
    cpntainer: {
        flex: 1
    },
    contentPicker: {
        paddingLeft: 5,
        height: 25,
        width: 40,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textRegion: {
        fontSize: 12,
        fontWeight: '400',
        color: Colors.textBlack
    },
    contentMenu: {
        flex: 1,
        flexDirection: 'row',
    },
    textTitleSetting: {
        flex: 1,
        fontFamily: Fonts.type.acuminProRegular,
        fontSize: 14,
        color: Colors.textBlack
    }
}
