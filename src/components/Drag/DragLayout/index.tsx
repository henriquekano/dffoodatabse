import * as React from 'react'
import { View, ViewProps } from 'react-native'



const DragLayout = (props: ViewProps) => {
  const { children } = props
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', width: '100%', height: '100%', marginTop: 56 }}>
      <View style={{ width: '50%', backgroundColor: 'white' }}>
        { children }
      </View>
    </View>
  )
}

export default DragLayout
