import { ThemeProvider } from '@mui/material'
import { StylesProvider } from '@mui/styles'
import React, { ReactNode, useState } from 'react'
import { themeCreator } from './base'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ThemeContext = React.createContext((themeName: string): void => {})

interface ThemeProviderWrapperProps {
  children: ReactNode
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = (props) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme'
  const [themeName, _setThemeName] = useState(curThemeName)
  const theme = themeCreator(themeName)
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName)
    _setThemeName(themeName)
  }

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  )
}

export default ThemeProviderWrapper
