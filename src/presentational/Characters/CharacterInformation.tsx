import * as React from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'
import R from 'ramda'
import { Modal } from '../../components/index'
import { NaturalPassiveAbility } from '../../../types/common'

export interface CharacterInformationProps {
  isOpen: boolean,
  naturalPassiveAbilities: NaturalPassiveAbility[],
  onClose: () => void,
}

const CharacterInformation = ({
  isOpen,
  naturalPassiveAbilities,
  onClose,
}: CharacterInformationProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 5,
        }}
        data={naturalPassiveAbilities}
        keyExtractor={(item) =>
          item.character_slug + item.name.en
        }
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>
              { `lvl ${item.level} ${item.name.en} - (${item.cost})` }
            </Text>
            <Text>
              {
                item.description
                  .replace(/\\n/g, '\n')
              }
            </Text>
          </View>
        )}
      />
    </Modal>
  )
}

export default CharacterInformation
