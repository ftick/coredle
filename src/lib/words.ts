import { getWordsByGame, WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { SMASH_VALID_GUESSES } from '../constants/validGuessesSmash'

import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import {
  loadUnlimitedStatsFromLocalStorage,
  saveUnlimitedStatsToLocalStorage,
} from './localStorage'
import { FLASH_VALID_GUESSES } from '../constants/validGuessesFlash'

// function getUrlVars() {
//   var parts = window.location.href.split('/');
//   console.log(parts)
//   var dict = new Map<string, string>();

//   parts.forEach((part: string) => {
//     if(part.includes('=')) {
//       var equals_index = parts.indexOf(part)
//       var key = part.substring(0,equals_index)
//       dict.set(key,part.substring(equals_index+1))
//     }
//   })
//   return dict;
// }

// function getUrlParam(parameter: string, defaultvalue: any){
//   var urlparameter = defaultvalue;
//   if(window.location.href.indexOf(parameter) > -1){
//       urlparameter = getUrlVars().get(parameter);
//       }
//   return urlparameter;
// }

function getURLParts() {
  var parts = window.location.href.replace('&', '').split('/')
  // console.log(parts)
  return parts
}

export function getURLBase() {
  var parts = getURLParts()
  return parts[0] + '//' + parts[2]
}

export function getURLFirst() {
  var parts = getURLParts()
  return parts[3]
}

export function getUrlOverrides() {
  var parts = getURLParts()
  parts = parts.splice(3)
  console.log(parts)
  var dict = new Map<string, number>()
  if (parts[0]) dict.set('daily', parseInt(parts[0]))
  dict.set('max', parseInt(parts[1]))
  return dict
}

// Set up overrides
const OVERRIDES = getUrlOverrides()
export const DAY_OVERRIDE = OVERRIDES.get('daily')

// February 15, 2022 Game Epoch
const epochMs = new Date('February 15, 2022 00:00:00').valueOf()
const msInDay = 86400000
export const THE_USUAL = Math.floor((Date.now() - epochMs) / msInDay)

export const isWordInWordList = (word: string, override = false) => {
  const WORD_LENGTH = word.length
  return (
    getWordsByGame(override).includes(word.toLowerCase()) ||
    VALID_GUESSES[WORD_LENGTH].includes(word.toLowerCase()) ||
    SMASH_VALID_GUESSES.includes(word.toLowerCase()) ||
    FLASH_VALID_GUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return WRONG_SPOT_MESSAGE(guess[i], i + 1)
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return NOT_CONTAINED_MESSAGE(letter)
    }
  }
  return false
}

export const getDayIndex = () => {
  if (DAY_OVERRIDE || DAY_OVERRIDE === 0) {
    if (DAY_OVERRIDE < 0 || DAY_OVERRIDE >= THE_USUAL) return THE_USUAL
    return DAY_OVERRIDE
  }
  return THE_USUAL
}

export const getWordDaily = () => {
  var index = getDayIndex()
  const nextday = (THE_USUAL + 1) * msInDay + epochMs

  console.log('daily #', index)

  var solutionToBe = WORDS[index % WORDS.length].toUpperCase()

  console.log(solutionToBe)

  return {
    solution: solutionToBe,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const getWordUnlimited = () => {
  const WORDS_BYGAME = getWordsByGame()
  var index = Math.floor(Math.random() * WORDS_BYGAME.length)
  const nextday = (THE_USUAL + 1) * msInDay + epochMs

  console.log('unlimited mode')

  var solutionToBe = WORDS_BYGAME[index % WORDS_BYGAME.length].toUpperCase()

  var loaded = loadUnlimitedStatsFromLocalStorage()
  var loaded_array = loaded?.pastSolutions

  if (loaded && loaded_array && loaded_array.length === WORDS_BYGAME.length) {
    saveUnlimitedStatsToLocalStorage({
      winDistribution: loaded?.winDistribution,
      gamesFailed: loaded?.gamesFailed,
      currentStreak: loaded?.currentStreak,
      bestStreak: loaded?.bestStreak,
      totalGames: loaded?.totalGames,
      successRate: loaded?.successRate,
      pastSolutions: [],
    })
  }

  while (
    loadUnlimitedStatsFromLocalStorage()?.pastSolutions.includes(solutionToBe)
  ) {
    index = Math.floor(Math.random() * WORDS_BYGAME.length)
    solutionToBe = WORDS_BYGAME[index % WORDS_BYGAME.length].toUpperCase()
  }

  console.log('soln:', solutionToBe)

  return {
    solution: solutionToBe,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const getWord = () => {
  if (DAY_OVERRIDE === undefined) return getWordDaily()
  if (getURLFirst() === 'infinite') return getWordUnlimited()
  return getWordDaily()
}

export const { solution, solutionIndex, tomorrow } = getWord()
