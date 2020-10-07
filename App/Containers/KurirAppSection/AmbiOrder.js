import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import HeaderMasPantes from '../../Components/HeaderMasPantes'
import styles from '../Styles/ListOrderScreenStyle'
import { Colors } from '../../Themes'
import ListOrder from './ListOrder'

class OrderDiambilScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} hidden={false} barStyle="light-content" backgroundColor={'#ccb102'} />
                <ListOrder />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDiambilScreen)
