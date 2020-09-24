import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// import { Images, Fonts, Colors } from '../../theme'
import styles from './Styles/Content'

  // <Image source={Images.emptyInboxIcon} style={styles.imageEmpty}/>

export const ErrorContent = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
    >
      <View style={styles.containerEmpty}>
        <Icon name="error-outline" size={styles.WIDTH_ICON_EMPTY} style={styles.imageEmpty}/>
        <Text style={styles.textEmptyTitle}>{props.title}</Text>
        <Text style={styles.textEmptyMessage}>{props.message}</Text>
        <TouchableOpacity
          onPress={props.onRefresh}
          style={styles.btnTryAgain}>
          <Text>{props.textButton}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

ErrorContent.defaultProps = {
  title: "Sorry something went wrong",
  message: "We appologize for the incovenience. please try again later.",
  textButton: "Try again",
  refreshing: false,
  onRefresh: () => {}
}
