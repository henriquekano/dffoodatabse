import * as React from 'react'
import { PureComponent } from 'react'
import { View } from 'react-native'
import { Snackbar } from 'react-native-paper'
import R from 'ramda'
import {
  Chip,
  Header,
  DraggableView,
  DragLayout,
  DragFlatListTarget,
} from '../../components/index'
import { DraggableRenderItemInfo } from '../../components/Drag/DragFlatListTarget/index'
import { Character, NaturalPassiveAbility } from '../../../types/common'
import { CHARACTERS } from '../../react-navigation/routes'
import CharacterItem from './CharacterItem'
import CharacterInformation from './CharacterInformation'
import { snakeCaseToSpacedCamelCase } from '../../data-formatter/string'

export interface CharactersPresentationalProps {
  characters: Character[],
  characterRoles: string[],
  naturalPassiveAbilities: NaturalPassiveAbility[],
  onTag: (role: string, character: Character) => void,
  onSelectCharacterRole: (role: string, character: Character) => void,
  onDrawerPress: () => void,
}

interface StateProps {
  drawerOpen: boolean,
}

class CharactersPresentational extends PureComponent<CharactersPresentationalProps> {
  drawerRef?: DragLayout = React.createRef()
  state = {
    drawerOpen: false,
    snackbarMessage: '',
    characterInformationIsOpen: false,
    selectedCharacterNaturalAbilities: [],
  }

  formatCharactersToFlatList = (): [{ data: Character, key: string }] => {
    const { characters } = this.props
    const formatCharacterData = R.applySpec({
      data: R.identity,
      key: R.propOr(null, 'slug'),
    })
    return R.map(formatCharacterData, characters)
  }

  handleOnDrop = (role: string, character: Character) => {
    const { onTag } = this.props
    if (character.profile.traits.role.includes(role)) {
      this.setState({
        snackbarMessage: `${snakeCaseToSpacedCamelCase(character.slug)} already has the role ${role}`,
      })
      return
    }

    onTag(role, character)
    this.setState({
      snackbarMessage: `Role ${role} added to ${snakeCaseToSpacedCamelCase(character.slug)}`,
    })
  }

  handleCharacterRoleLongPress = (role: string, character: Character) => {
    const { onSelectCharacterRole } = this.props
    onSelectCharacterRole(role, character)
    this.setState({
      snackbarMessage: `Role ${role} remove from ${snakeCaseToSpacedCamelCase(character.slug)}`,
    })
  }

  handleSnackbarDismiss = () => {
    this.setState({
      snackbarMessage: '',
    })
  }

  handleToggleModal = () => {
    requestAnimationFrame(() => {
      this.setState((prevState: StateProps) => ({
        drawerOpen: !prevState.drawerOpen,
      }), () => {
        if (this.drawerRef) {
          this.drawerRef.toggle()
        }
      })
    })
  }

  handleCharacterPress = (character: Character) => {
    const { naturalPassiveAbilities } = this.props
    console.log(character)
    const selectedCharacterNaturalAbilities = R.pipe(
      R.filter(
        R.propEq('character_slug', character.slug)
      ),
      R.sortBy(R.prop('level')),
    )(naturalPassiveAbilities)

    this.setState({
      characterInformationIsOpen: true,
      selectedCharacterNaturalAbilities,
    })
  }

  handleCloseCharacterInformation = () => {
    this.setState({
      characterInformationIsOpen: false,
    })
  }

  render = () => {
    const {
      characterRoles,
      characters,
      onDrawerPress,
    } = this.props
    const {
      drawerOpen,
      snackbarMessage,
      characterInformationIsOpen,
      selectedCharacterNaturalAbilities,
    } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header onDrawerPress={onDrawerPress} title={CHARACTERS}/>
        <DragFlatListTarget
          keyExtractor={item => item.key}
          nameExtractor={item => item.key}
          onDrop={(event, state, role, item) => {
            this.handleOnDrop(role, item.data)
          }}
          dragAreaWidthMultiplier={0.5}
          extraData={{ drawerOpen, characters }}
          data={this.formatCharactersToFlatList()}
          renderItem={(
            { item: { data, key }, index, separator, draggableHovering, draggableDropped }
            : DraggableRenderItemInfo
          ) => (
            <CharacterItem
              isUnderneathDrawer={drawerOpen && !draggableHovering}
              data={data}
              key={key}
              onLongPress={this.handleCharacterRoleLongPress}
              onPress={this.handleCharacterPress}
            />
          )}
        />
        <Snackbar
          visible={!!snackbarMessage}
          onDismiss={this.handleSnackbarDismiss}
          duration={2000}
        >
          { snackbarMessage }
        </Snackbar>
        <DragLayout
          ref={(ref) => {
            this.drawerRef = ref
          }}
          onPressNub={this.handleToggleModal}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {
              characterRoles.map((role: string) => (
                <DraggableView value={role} targetName="all" key={role}>
                  <Chip style={{ backgroundColor: 'white' }}>
                    { role }
                  </Chip>
                </DraggableView>
              ))
            }
          </View>
        </DragLayout>
        <CharacterInformation
          naturalPassiveAbilities={selectedCharacterNaturalAbilities}
          isOpen={characterInformationIsOpen}
          onClose={this.handleCloseCharacterInformation}
        />
      </View>
    )
  }
}

export default CharactersPresentational
