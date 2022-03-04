import React from 'react'
import { render, screen } from '@testing-library/react'
import AppInf from './AppInf'
import { GAME_TITLE } from './constants/strings'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

test('renders App component', () => {
  render(<AppInf />)
  const linkElement = screen.getByText(GAME_TITLE.concat(' ∞'))
  // const linkElement = screen.getByText(GAME_TITLE.concat(' Infinite'))
  expect(linkElement).toBeInTheDocument()
})
