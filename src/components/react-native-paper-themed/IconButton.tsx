import * as React from 'react'
import { withTheme, IconButton, IconButtonProps, Theme } from 'react-native-paper'

export interface PublicInterface extends IconButtonProps {}

interface ThemedIconButtonProps extends IconButtonProps {
  theme: Theme,
}

const ThemedIconButton = (props: ThemedIconButtonProps) => {
  const { theme } = props
  return (
    <IconButton
      color={theme.colors.accent}
      {...props}
    />
  )
}

export default withTheme(ThemedIconButton)
