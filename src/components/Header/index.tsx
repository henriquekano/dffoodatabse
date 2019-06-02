import * as React from 'react'
import { StatusBar, View, TouchableOpacity } from 'react-native'
import { Header as LibHeader, Icon, HeaderProps } from 'react-native-elements'

export interface Props extends HeaderProps {
  onChartPress: () => void,
  onCharacterPress: () => void,
}

const Header = (props: Props): React.ReactNode => {
  const {
    onChartPress,
    onCharacterPress,
    ...restOfProps
  } = props
  return (
    <LibHeader
      centerComponent={{ text: 'Dffoo db', style: { color: '#fff' } }}
      containerStyle={{
        backgroundColor: '#3D6DCC',
        marginTop: ((StatusBar.currentHeight || 0) * -1),
      }}
      rightComponent={(
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10 }}
            onPress={onCharacterPress}
          >
            <Icon
              type="material-community"
              name="alien"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 10 }}
            onPress={props.onChartPress}
          >
            <Icon
              type="material-community"
              name="lightbulb-on-outline"
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
      {...restOfProps}
    />
  )
}

export default Header
