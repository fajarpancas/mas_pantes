import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// import { Images, Fonts, Colors } from '../../theme'
import styles from './Styles/Content'

  // <Image source={Images.emptyInboxIcon} style={styles.imageEmpty}/>

export const EmptyContent = (props) => {
  return (
    <View style={styles.containerEmpty}>
      <Icon name="info-outline" size={styles.WIDTH_ICON_EMPTY} style={styles.imageEmpty}/>
      <Text style={styles.textEmptyTitle}>{props.title}</Text>
      <Text style={styles.textEmptyMessage}>{props.message}</Text>
    </View>
  )
}

EmptyContent.defaultProps = {
  title: "No Item Found",
  message: "We don't have any item that you request",
  textButton: "Try again",
  onRefresh: () => {}
}
