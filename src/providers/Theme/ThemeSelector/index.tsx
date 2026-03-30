'use client'

import React, { useEffect, useMemo, useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { MoonIcon, SunIcon } from 'lucide-react'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  useEffect(() => {
    if (theme) setValue(theme)
  }, [theme])

  const currentTheme: Theme = useMemo(() => {
    return theme ?? (value === 'dark' || value === 'light' ? (value as Theme) : 'light')
  }, [theme, value])

  const toggleTheme = () => {
    onThemeChange(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Theme: ${currentTheme}. Tap to switch.`}
      className='cursor-pointer'
    >
      {currentTheme === 'dark' ? <MoonIcon size={24} /> : <SunIcon size={24} />}
    </button>
  )
}
