import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    Image, TouchableOpacity
} from 'react-native'
import { Colors, Fonts, Images } from '../Themes'
import Scale from '../Transforms/Scale'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import { RNCamera } from 'react-native-camera'

class CustomTableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            cameraTypeBack: true,
            flashMode: true,
        }
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.renderCamera = this.renderCamera.bind(this)
        this.takePicture = this.takePicture.bind(this)
        this.changeCameraType = this.changeCameraType.bind(this)
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


    async takePicture() {
        const options = { quality: 0.5, base64: true }
        const data = await this.camera.takePictureAsync(options)
        this.props.onCapture(data)
        this.hide()
    }

    changeCameraType() {
        const { cameraTypeBack } = this.state
        this.setState({ cameraTypeBack: !cameraTypeBack })
    }

    renderCamera() {
        const { flashMode, cameraTypeBack } = this.state
        return (
            <View style={{ flex: 1 }}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    playSoundOnCapture={true}
                    captureAudio={false}
                    type={cameraTypeBack ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                    flashMode={flashMode ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
                <View style={{ position: 'absolute', justifyContent: 'center', width: Scale(375), height: '100%' }}>
                    <View style={{ position: 'absolute', top: 0 }}>
                        <View style={styles.sideActionFrameDiv}>
                            <TouchableOpacity style={{ width: Scale(45) }} onPress={this.hide}>
                                <Image source={Images.IconCancel} style={styles.iconCancel} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, height: 100 }}>
                        <View style={styles.sideActionFrame}>
                            <TouchableOpacity onPress={() => this.setState({ flashMode: !flashMode })}>
                                <Image source={flashMode ? Images.FlashOn : Images.FlashOff} style={styles.iconFlash} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.midActionFrame}>
                            <TouchableOpacity onPress={this.takePicture.bind(this)}>
                                <Image source={Images.cameraClick} style={styles.cameraClick} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sideActionFrame}>
                            <TouchableOpacity onPress={() => this.changeCameraType()} style={{ width: Scale(45), alignSelf: 'flex-end' }}>
                                <Image source={Images.CameraSwitch} style={styles.iconSwitch} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { isVisible } = this.state
        const { flashMode, cameraTypeBack } = this.state
        return (
            <View>
                <Modal
                    onBackButtonPress={this.hide}
                    onBackdropPress={this.hide}
                    style={{ margin: 0 }}
                    backdropTransitionOutTiming={0}
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    isVisible={isVisible}>
                    <View style={styles.modalWrapper}>
                        {this.renderCamera()}
                    </View>
                </Modal>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window')

const styles = {
    modalWrapper: {
        flex: 1,
    },
    sideActionFrame: {
        justifyContent: 'center',
        width: '30%',
        padding: 15
    },
    sideActionFrameDiv: {
        justifyContent: 'center',
        width,
        paddingTop: Platform.select({ ios: getStatusBarHeight(), android: 0 })
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    midActionFrame: {
        justifyContent: 'center',
        width: '40%',
        paddingBottom: 16
    },
    iconCamera: {
        height: Scale(25),
        width: Scale(25),
        margin: 15
    },
    iconCancel: {
        marginLeft: 20,
        marginTop: 25,
        height: Scale(20),
        width: Scale(20)
    },
    iconFlash: {
        height: Scale(25),
        width: Scale(25),
        marginLeft: 26,
        marginBottom: 20
    },
    iconSwitch: {
        height: Scale(25),
        width: Scale(25),
        marginRight: 26,
        marginBottom: 20
    },
    cameraClick: {
        height: 90,
        width: 90,
        alignSelf: 'center'
    },
}

export default CustomTableRow;
