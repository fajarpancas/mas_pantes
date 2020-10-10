import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import { connect } from 'react-redux'
import styles from '../Styles/HomeScreenStyle'

class HeaderName extends Component {
    render() {
        const { user } = this.props
        let name = '-'

        if (user && user.Nama_User) {
            name = user.Nama_User
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headerLeft}>
                    <Text style={styles.hiText}>Hai,</Text>
                    <Text style={styles.usernameText}>{name}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.session.userSession
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderName)
