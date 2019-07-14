import * as React from 'react'
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { IconButton } from 'react-native-paper'

export interface ModalProps {
  isOpen: boolean,
  children: React.ReactNode[] | React.ReactNode,
  onClose: () => void,
}

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    children,
    onClose,
  } = props

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={isOpen}
      hardwareAccelerated
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
        <View style={{ flex: 1, margin: 10, backgroundColor: 'white', borderRadius: 10 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: 'lightgrey',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={onClose}
          >
            <IconButton
              icon="close"
            />
          </TouchableOpacity>
          { children }
        </View>
      </View>
    </RNModal>
  )
}

export default Modal
