import * as React from 'react'
import {
  TouchableOpacity,
  View,
  Modal,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native'
import {
  Icon,
  Text,
  Input,
  Button,
} from 'react-native-elements'
import R from 'ramda'

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
      visible={filterOpen}
      hardwareAccelerated
    >
      <View style={{ flex: 1 }}>
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
              <TouchableOpacity
                onPress={() => onPressRole(role)}
                key={role}
                style={[
                  R.contains(role, rolesFilter) ? chipSelectedStyle : null,
                  { paddingHorizontal: 6, paddingVertical: 4, margin: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 20 }
                ]}
              >
                <Text style={R.contains(role, rolesFilter) ? chipSelectedTextStyle : null} >
                  { role }
                </Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <Button
          title="APPLY"
          containerStyle={{
            padding: 10
          }}
          buttonStyle={{
            backgroundColor: '#3D6DCC'
          }}
          onPress={onApply}
        />
      </View>
    </Modal>
  )
}

export default ModalFilter
