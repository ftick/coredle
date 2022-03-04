import { getGuessStatuses } from './statuses'
import { solution, solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'
import { getStoredIsHighContrastMode } from './localStorage'
import { MAX_CHALLENGES } from '../constants/settings'

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  includeLink: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
      generateEmojiGrid(guesses) +
      `${includeLink ? '\nrandle.vercel.app' : ''}`
  )
}

export const shareStatusInf = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  includeLink: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${lost ? 'X' : guesses.length}/${solution.length}${
      isHardMode ? '*' : ''
    }\n\n` +
      generateEmojiGrid(guesses) +
      `${includeLink ? '\nrandle.vercel.app/infinite' : ''}`
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      const isHighContrast = getStoredIsHighContrastMode()
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              if (isHighContrast) {
                return '🟧'
              }
              return '🟩'
            case 'present':
              if (isHighContrast) {
                return '🟦'
              }
              return '🟨'
            default:
              if (localStorage.getItem('theme') === 'dark') {
                return '⬛'
              }
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
