import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Fonts, Colors, Images } from '../Themes'
import Scale from '../Transforms/Scale'
import Modal from 'react-native-modal'
import I18n from '../I18n'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { EmptyContent } from '../Components'

export default class CustomSelectOption extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
            chosen: this.props.defaultValue,
            chosenId: null
        }
    }

    showHideDropdown = () => this.setState({ showDropdown: !this.state.showDropdown })

    select = () => {
        this.setState({ showDropdown: false })
        this.props.onSelect(this.state.chosen)
        this.props.setFieldValue(this.state.chosenId)
    }

    onRefresh = () => {
        this.props.onRefresh()
    }

    changeChosen = (id, title) => {
        this.setState({ chosen: title })
        this.setState({ chosenId: id })
    }


    renderList = ({ id, description }) => {
        const { chosen } = this.state
        return (
            <TouchableOpacity style={styles.listWrapper} onPress={() => this.changeChosen(id, description)}>
                <Image source={chosen === description ? Images.radioActive : Images.radio} style={styles.radioIcon} />
                <Text style={styles.listText}>{description}</Text>
            </TouchableOpacity>
        )
    }

    renderDropdown = () => {
        const { showDropdown } = this.state
        const { data, selectTitle } = this.props
        return (
            <Modal
                isVisible={showDropdown}
                onBackButtonPress={this.showHideDropdown}
                onBackdropPress={this.showHideDropdown}
                backdropTransitionOutTiming={0}
                animationIn={'slideInUp'}
            >
                <View style={styles.modal}>
                    <View style={styles.selectlistWrapper}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.selectTitle}>{selectTitle}</Text>
                        </View>
                        <TouchableOpacity onPress={this.showHideDropdown} activeOpacity={0.8}>
                            <Icons name='close' size={25} />
                        </TouchableOpacity>
                    </View>
                    {data.length > 0 ?
                        <ScrollView>
                            {data.map(this.renderList)}
                        </ScrollView>
                        :
                        <View>
                            <EmptyContent />
                            <TouchableOpacity onPress={this.onRefresh} activeOpacity={0.8}>
                                <Text style={styles.refreshText}>{I18n.t('Refresh')}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <TouchableOpacity style={styles.submitButton} onPress={this.select} activeOpacity={0.8}>
                        <Text style={styles.submitText}>Pilih</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    render() {
        const { label, title, defaultValue, error, errorMessage, disabled } = this.props
        return (
            <View style={{ flex: 1 }}>
                {/* {label !== null ? (
                    < Text style={styles.label}>{label}</Text>
                ) : null} */}

                {label !== null ? (
                    <TouchableOpacity
                        style={disabled ? styles.customFormInputDisabled : styles.customFormInput}
                        disabled={disabled}
                        onPress={this.showHideDropdown}
                        activeOpacity={0.8}
                    >
                        {defaultValue !== '' ?
                            <Text style={styles.value}>{defaultValue}</Text>
                            :
                            <Text style={styles.placeholder}>{title}</Text>
                        }
                        <Image source={Images.iconDropdown} style={styles.iconDropdown} />
                        {this.renderDropdown()}
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            style={styles.customFormInputNoBorder}
                            disabled={disabled}
                            onPress={this.showHideDropdown}
                            activeOpacity={0.8}
                        >
                            {defaultValue !== '' ?
                                <Text style={styles.value}>{defaultValue}</Text>
                                :
                                <Text style={styles.placeholder}>{title}</Text>
                            }
                            <Image source={Images.iconDropdown} style={styles.iconDropdown} />
                            {this.renderDropdown()}
                        </TouchableOpacity>
                    )
                }

                {label !== null ? (
                    <View style={styles.formPlacholderSelect}>
                        {error ?
                            <Text style={styles.textError}>{errorMessage}</Text> : <Text style={styles.textError}></Text>
                        }
                    </View>
                ) : null}
            </View >

        )
    }
}

const styles = {
    label: {
        fontFamily: Fonts.type.azoSansMedium,
        fontSize: 12,
        color: '#666666',
        marginBottom: 2
    },
    customFormInputNoBorder: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    customFormInput: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        flex: 1,
        alignItems: 'center'
    },
    customFormInputDisabled: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center'
    },
    iconDropdown: {
        width: Scale(27),
        height: Scale(24),
    },
    placeholder: {
        flex: 1,
        fontFamily: Fonts.type.azoSansRegular,
        fontSize: 13,
        // paddingLeft: 5,
        color: '#999999'
    },
    value: {
        flex: 1,
        fontFamily: Fonts.type.azoSansRegular,
        // paddingLeft: 5,
        fontSize: 13,
        color: Colors.textBlack
    },
    radioIcon: {
        width: Scale(20),
        height: Scale(20)
    },
    listText: {
        fontFamily: Fonts.type.azoSansRegular,
        fontSize: 14,
        color: Colors.textBlack,
        marginLeft: 12
    },
    listWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 5
    },
    refreshText: {
        alignSelf: 'center',
        color: Colors.goldBasic,
        fontFamily: Fonts.type.azoSansRegular,
        fontSize: 14,
        marginVertical: 10
    },
    selectlistWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    submitButton: {
        backgroundColor: Colors.goldBasic,
        width: Scale(327),
        height: 40,
        borderRadius: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    submitText: {
        fontFamily: Fonts.type.azoSansMedium,
        fontSize: 14,
        color: Colors.white,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    modal: {
        backgroundColor: Colors.white,
        flex: 1,
        width: Scale(375),
        maxHeight: Scale(600),
        alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: 15,
        position: 'absolute',
        bottom: -15,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    selectTitle: {
        fontFamily: Fonts.type.azoSansMedium,
        fontSize: 20,
        color: Colors.textBlack,
        marginBottom: 20
    },
    textError: {
        textAlign: 'left',
        fontSize: 10,
        marginTop: 1,
        color: 'red',
        fontFamily: Fonts.type.azoSansRegular,
    },
    formPlacholderSelect: {
        marginBottom: 7
    }
}
