import * as React from 'react'
import { RouteComponentProps } from 'react-router-native'
import { HeaderProps } from 'react-native-elements'
import { Props as BarGraphProps } from './BarGraph/'
import { Props as ModalFilterProps } from './ModalFilter/index'
import { ScrollWhenHeightChangesProps } from './ScrollWhenHeightChanges/index'
import { Gear } from '../../types/common'

declare class DevDrawer extends React.PureComponent<any, any> {}
declare class NetworkStatus extends React.PureComponent<any, any> {}
declare class BarGraph extends React.PureComponent<BarGraphProps, any>{}
declare class Header extends React.PureComponent<HeaderProps, any>{}
declare class ModalFilter extends React.PureComponent<ModalFilterProps, any>{}
declare class ScrollWhenHeightChanges extends React.PureComponent<ScrollWhenHeightChangesProps, any>{}

interface GearViewProps {
  limitBreakLevel: number,
  gear: Gear,
  onPressLimitBreak: (
    { gear, limitBreakLevel }: { gear: Gear, limitBreakLevel: number }
  ) => void,
}
declare class GearView extends React.PureComponent<GearViewProps, any>{}

interface SnappyScrollViewProps {
  data: any[],
  itemsPerPage: number,
  renderItem: (data: any) => React.ReactNode,
}
declare class SnappyScrollView extends React.PureComponent<SnappyScrollViewProps, any>{}
