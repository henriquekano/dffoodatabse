import * as React from 'react'
import { StatusBar, View, TouchableOpacity } from 'react-native'
import { Appbar, AppbarProps } from 'react-native-paper'
import { Icon, HeaderProps } from 'react-native-elements'

export interface Props {
  onDrawerPress: () => void,
  title: string,
}

const Header = (props: Props): React.ReactNode => {
  const {
    onDrawerPress,
    title,
    ...restOfProps
  } = props
  return (
    <Appbar {...restOfProps}>
      <Appbar.Action icon="menu" onPress={onDrawerPress}/>
      <Appbar.Content title={title} />
    </Appbar>
  )
}

export default Header
