import * as React from 'react'
import { RouteComponentProps } from 'react-router-native'
import { Props as HeaderProps } from './Header/index'
import { Props as BarGraphProps } from './BarGraph/'
import { Props as ModalFilterProps } from './ModalFilter/index'
import { ScrollWhenHeightChangesProps } from './ScrollWhenHeightChanges/index'
import { ChipProps } from './Chip/index'
import { ScrollOfChipsProps } from './ScrollOfChips/index'
import { DragTargetProps } from './Drag/DragTarget/index'
import { DraggableViewProps } from './Drag/DraggableView/index'
import { DragLayoutProps } from './Drag/DragLayout/index'
import { Props as TagModalProps } from './TagModal/index'
import { VeilProps } from './Veil/index'
import { PublicInterface as ThemedIconButtonProps } from './react-native-paper-themed/IconButton'
import { Gear } from '../../types/common'

declare class DevDrawer extends React.PureComponent<any, any> {}
declare class NetworkStatus extends React.PureComponent<any, any> {}
declare class BarGraph extends React.PureComponent<BarGraphProps, any>{}
declare class Header extends React.PureComponent<HeaderProps, any>{}
declare class ModalFilter extends React.PureComponent<ModalFilterProps, any>{}
declare class ScrollWhenHeightChanges extends React.PureComponent<ScrollWhenHeightChangesProps, any>{}
declare class Chip extends React.PureComponent<ChipProps, any>{}
declare class ScrollOfChips extends React.PureComponent<ScrollOfChipsProps, any>{}
declare class DragTarget extends React.PureComponent<DragTargetProps, any>{}
declare class DraggableView extends React.PureComponent<DraggableViewProps, any>{}
declare class TagModal extends React.PureComponent<TagModalProps, any>{}
declare class IconButton extends React.PureComponent<ThemedIconButtonProps, any>{}
declare class DragLayout extends React.PureComponent<DragLayoutProps, any>{}
declare class Veil extends React.PureComponent<VeilProps, any>{}

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
