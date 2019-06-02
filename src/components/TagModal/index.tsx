import * as React from 'react'
import { Fragment } from 'react'
import {
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native'
import {
  Icon,
} from 'react-native-elements'
import {
  Button,
  TextInput,
  Text,
  Card,
} from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { Chip } from '../index'
import CharacterRow from './CharacterRow'
import { snakeCaseToSpacedCamelCase } from '../../data-formatter/string'
import { Character } from '../../../types/common'

const R = require('ramda')

export interface Props {
  filterOpen: boolean,
  characterRoles: string[],
  characters: Character[],
  selectedCharacters: Character[],
  selectedRoles: string[],
  onPressRole: (role: string) => void,
  onPressCharacter: (character: Character) => void,
  onApply: () => void,
  onClose: () => void,
}

const roleIsSelected = (role: string, listOfRoles: string[]) => {
  return R.any(role)(listOfRoles)
}

const TagModal = (props: Props) => {
  const {
    filterOpen,
    characterRoles,
    selectedRoles,
    characters,
    selectedCharacters,
    onPressRole,
    onPressCharacter,
    onApply,
    onClose,
  } = props
  const chipSelectedStyle = {
    backgroundColor: '#3D6DCC',
  }
  const chipSelectedTextStyle = {
    color: 'white',
  }
  const groupedCharacters = R.splitEvery(3, characters)
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
          <View style={{ maxHeight: '50%' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#3D6DCC', padding: 10 }}>
              <Text style={{ color: 'white' }}>Character Role</Text>
            </View>
            <ScrollView>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {
                  characterRoles.map(role => (
                    <Chip
                      key={role}
                      onPress={() => onPressRole(role)}
                      selected={roleIsSelected(role, selectedRoles)}
                    >
                      { role }
                    </Chip>
                  ))
                }
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#3D6DCC', padding: 10 }}>
              <Text style={{ color: 'white' }}>Character</Text>
            </View>
            <FlatList
              getItemLayout={(data, index) => (
                { length: 100, offset: 100 * index, index }
              )}
              initialNumToRender={10}
              data={groupedCharacters}
              keyExtractor={(item) => R.pipe(
                R.pluck('slug'),
                R.join('-'),
              )(item)}
              renderItem={({ item }: { item: Character[] }) => (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <CharacterRow
                    item={item}
                    onPressCharacter={onPressCharacter}
                    selectedCharacters={selectedCharacters}
                  />
                </View>
              )}
            />

          </View>
          <View style={{ padding: 10, borderColor: 'lightgrey', borderTopWidth: StyleSheet.hairlineWidth }}>
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

export default TagModal
