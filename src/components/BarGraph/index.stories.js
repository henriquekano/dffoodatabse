/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import BarGraph from '.'

storiesOf('BarGraph', module)
  .add('default', () => (
    <BarGraph
      characters={[]}
      gears={[]}
      roles={[]}
      savedGears={[]}
    />
  ))
