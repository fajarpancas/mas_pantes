import React, { Component } from 'react'
import { View, FlatList, Text, ActivityIndicator } from 'react-native'

import { EmptyContent } from './EmptyContent'
import { ErrorContent } from './ErrorContent'

export default class CustomFlatList extends Component {

  render() {
    const dataIsArray = Array.isArray(this.props.data)
    const msgError = dataIsArray ? this.props.errorMessage : 'Invalid Data'

    try {
      if (this.props.error || !dataIsArray) {
        return (
          <ErrorContent
            title={this.props.errorTitle}
            message={msgError}
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
          />
        )
      }

      return (
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            renderItem={this.props.renderItem}
            refreshing={false}
            onRefresh={this.props.onRefresh}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={this.props.ListHeaderComponent}
            ListFooterComponent={this.props.ListFooterComponent}
            ListEmptyComponent={() => {
              if (!this.props.refreshing && this.props.renderEmpty) {
                // return this.props.renderEmpty()
                return <EmptyContent title={this.props.emptyTitle} message={this.props.emptyMessage} />
              }
              return (
                <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                  <ActivityIndicator size={20}/>
                  <Text style={{ alignSelf: 'center', marginLeft: 10 }}>Mengambil data...</Text>
                </View>
              )
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            onEndReached={this.props.onEndReached}
          />
        </View>
      )
    } catch (err) {
      __DEV__ && console.tron.error('CustomFlatList.err ')
      __DEV__ && console.tron.log('CustomFlatList.message ', err.message)
      return <ErrorContent
        title={this.props.errorTitle}
        message={this.props.errorMessage}
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
      />
    }
  }
}

CustomFlatList.defaultProps = {
  data: [],
  renderItem: ({ item, index }) => { return null },
  renderEmpty: null,
  onRefresh: () => { },
  refreshing: false,
  onEndReached: distance => { },
  emptyTitle: "No Item Found",
  emptyMessage: "We don't have any item that you request",
  error: false,
  errorTitle: "Sorry something went wrong",
  errorMessage: "We appologize for the incovenience. please try again later.",
  errorTextButton: "Try again",
  ListHeaderComponent: null,
  ListFooterComponent: null
}

const styles = {
  container: {
    flex: 1
  }
}
