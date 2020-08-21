import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import
BarcodeScanner,
{
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
    pauseScanner,
    resumeScanner
} from 'react-native-barcode-scanner-google';
import styles from '../../Styles/SalesScreenStyle'
import { RNCamera } from 'react-native-camera'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../../Themes';
import Scale from '../../../Transforms/Scale';

class BarcodeScannerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cameraOpen: true,
            cameraTypeBack: false,
            flashMode: true,
        }
    }

    takePicture = async () => {
        const data = await this.camera.takePictureAsync(options)
        console.tron.log(data)
    }

    renderCamera = () => {
        const { flashMode, cameraTypeBack } = this.state
        return (
            <View style={{ flex: 0 }}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    playSoundOnCapture={true}
                    captureAudio={false}
                    onPictureTaken={() => this.onCapture()}
                    type={cameraTypeBack ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                    flashMode={flashMode ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
            </View >
        )
    }

    closeScanner = () => {
        this.props.closeScanner()
    }

    onGetData = (data) => {
        this.props.closeScanner()
        this.props.dataScanner(data)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                {this.renderCamera()}
                <View style={styles.scanTheBarcode}>
                    <TouchableOpacity onPress={this.closeScanner}>
                        <Icons style={{ padding: 10 }} name={'arrow-back'} size={30} color={Colors.textGrey} />
                    </TouchableOpacity>
                    <Text style={styles.textBarcode}>Scanning barcode</Text>
                    <Icons style={{ padding: 10 }} name={'arrow-back'} size={30} color={Colors.white} />
                </View>
                <BarcodeScanner
                    style={{ flex: 1 }}
                    focusMode={FocusMode.FIXED /* could also be TAP or FIXED */}
                    torchMode={TorchMode.ON /* could be the default OFF */}
                    cameraFillMode={
                        CameraFillMode.COVER /* could also be FIT */
                    }
                    onBarcodeRead={({ data, type }) => {
                        this.onGetData(data)
                    }}
                    barcodeType={
                        BarcodeType.ALL /* replace with ALL for all alternatives */
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScannerScreen)
