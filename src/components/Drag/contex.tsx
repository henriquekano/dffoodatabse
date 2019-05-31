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
export default new Subject()
