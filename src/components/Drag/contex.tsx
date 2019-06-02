import {
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native'
import { Subject } from 'rxjs'

export type Target = string | 'all'
export interface Message {
  gestureResponderEvent: GestureResponderEvent,
  gestureState: PanResponderGestureState,
  value: any,
  target: Target,
}

const dropChannel = new Subject()
const moveChannel = new Subject()

export {
  dropChannel,
  moveChannel,
}
