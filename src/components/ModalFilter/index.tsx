import * as React from 'react'
import {
  TouchableOpacity,
  View,
  Modal,
} from 'react-native'
import {
  Icon,
  Text,
  Input,
} from 'react-native-elements'
import {
  Button,
} from 'react-native-paper'
import R from 'ramda'
import { Chip } from '../index'

export interface Filter {
  role: string[],
}

export interface Props {
  filterOpen: boolean,
  characterRoles: string[],
  filters: Filter,
  onPressRole: (role: string) => void,
  onApply: () => void,
  onClose: () => void,
  onTypeCharacterName: (name: string) => void,
}

const ModalFilter = (props: Props) => {
  const {
    filterOpen,
    characterRoles,
    filters: { role: rolesFilter },
    onPressRole,
    onApply,
    onClose,
    onTypeCharacterName,
  } = props
  const chipSelectedStyle = {
    backgroundColor: '#3D6DCC',
  }
  const chipSelectedTextStyle = {
    color: 'white',
  }
  return (
    <Modal
      animationType="fade"
      transparent
      visible={filterOpen}
      hardwareAccelerated
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
        <View style={{ flex: 1, margin: 10, backgroundColor: 'white', borderRadius: 10 }}>
          <TouchableOpacity style={{ paddingVertical: 5 }} onPress={onClose}>
            <Icon
              name="close"
              color="black"
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', backgroundColor: '#3D6DCC', padding: 10 }}>
            <Text style={{ color: 'white' }}>Character Name</Text>
          </View>
          <Input
            onChangeText={onTypeCharacterName}
            style={{ marginBottom: 10 }} placeholder="Marche"
          />
          <View style={{ flexDirection: 'row', backgroundColor: '#3D6DCC', padding: 10 }}>
            <Text style={{ color: 'white' }}>Character Role</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {
              characterRoles.map(role => (
                <Chip
                  key={role}
                  onPress={() => onPressRole(role)}
                  selected={R.contains(role, rolesFilter)}
                >
                  { role }
                </Chip>
              ))
            }
          </View>
          <View style={{ padding: 10 }}>
            <Button
              mode="contained"
              color="#3D6DCC"
              onPress={onApply}
            >
              APPLY
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalFilter
