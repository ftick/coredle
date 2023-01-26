import { getGuessStatuses } from './statuses'
import { solutionIndex, unicodeSplit } from './words'
import { GAME_TITLE, GAME_URL } from '../constants/strings'
// import { getStoredIsHighContrastMode } from './localStorage'
import { maxChallenges } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

// export const shareStatus = (
//   guesses: string[],
//   lost: boolean,
//   isHardMode: boolean,
//   includeLink: boolean
// ) => {
//   navigator.clipboard.writeText(
//     `${GAME_TITLE} ${solutionIndex} ${
//       lost ? 'X' : guesses.length
//     }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
//       generateEmojiGrid(guesses) +
//       `${includeLink ? '\ncoredle.vercel.app' : ''}`
//   )
// }

export const shareStatus = (
  solution: string,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  includeLink: boolean,
  includeWords: boolean,
  handleShareToClipboard: () => void
) => {
  const textToShare =
    `${GAME_TITLE} ${solutionIndex + 1} ${
      lost ? 'X' : guesses.length
    }/${maxChallenges(isHardMode)}${isHardMode ? ' 😺🎀' : ''}\n\n` +
    generateEmojiGrid(
      solution,
      guesses,
      getEmojiTiles(isDarkMode, isHighContrastMode),
      includeWords
    ) +
    `${includeLink ? `\n${GAME_URL}` : ''}`

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

export const shareStatusInf = (
  solution: string,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  includeLink: boolean,
  includeWords: boolean,
  handleShareToClipboard: () => void
) => {
  const textToShare =
    `${GAME_TITLE}∞ ${lost ? 'X' : guesses.length}/${maxChallenges(
      isHardMode
    )}${isHardMode ? ' 😺🎀' : ''}\n\n` +
    generateEmojiGrid(
      solution,
      guesses,
      getEmojiTiles(isDarkMode, isHighContrastMode),
      includeWords
    ) +
    `${includeLink ? `\n${GAME_URL}/infinite` : ''}`

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

// export const shareStatusInf = (
//   guesses: string[],
//   lost: boolean,
//   isHardMode: boolean,
//   includeLink: boolean
// ) => {
//   navigator.clipboard.writeText(
//     `${GAME_TITLE} ${lost ? 'X' : guesses.length}/${solution.length}${
//       isHardMode ? '*' : ''
//     }\n\n` +
//       generateEmojiGrid(guesses) +
//       `${includeLink ? '\ncoredle.vercel.app/infinite' : ''}`
//   )
// }

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[],
  includeWords: boolean
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      return (
        splitGuess
          .map((_, i) => {
            switch (status[i]) {
              case 'correct':
                return tiles[0]
              case 'present':
                return tiles[1]
              default:
                return tiles[2]
            }
          })
          .join('') + (includeWords ? ' ||' + guess + '||' : '')
      )
    })
    .join('\n')
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩')
  tiles.push(isHighContrastMode ? '🟦' : '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
