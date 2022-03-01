import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { SMASH_VALID_GUESSES } from '../constants/validGuessesSmash'

import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import {
  loadUnlimitedStatsFromLocalStorage,
  saveUnlimitedStatsToLocalStorage,
} from './localStorage'

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

const OVERRIDES = getUrlOverrides()
export const DAY_OVERRIDE = OVERRIDES.get('daily')
var max_override = OVERRIDES.get('max')
export const LENGTH_OVERRIDE =
  !max_override || max_override < 3 || max_override > 7 ? 5 : max_override

// February 15, 2022 Game Epoch
const epochMs = new Date('February 15, 2022 00:00:00').valueOf()
const msInDay = 86400000
export const THE_USUAL = Math.floor((Date.now() - epochMs) / msInDay)

export const isWordInWordList = (word: string) => {
  const WORD_LENGTH = word.length
  return (
    WORDS[WORD_LENGTH].includes(word.toLowerCase()) ||
    VALID_GUESSES[WORD_LENGTH].includes(word.toLowerCase()) ||
    SMASH_VALID_GUESSES.includes(word.toLowerCase())
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

  console.log('daily')
  console.log('len', LENGTH_OVERRIDE, 'index', index)

  var solutionToBe =
    WORDS[LENGTH_OVERRIDE][index % WORDS[LENGTH_OVERRIDE].length].toUpperCase()

  return {
    solution: solutionToBe,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

function checkSameLength(word: string) {
  return word.length === LENGTH_OVERRIDE
}

function checkNotSameLength(word: string) {
  return !checkSameLength(word)
}

export const getWordUnlimited = () => {
  var index = Math.floor(Math.random() * WORDS[LENGTH_OVERRIDE].length)
  const nextday = (THE_USUAL + 1) * msInDay + epochMs

  console.log('unlimited')

  var solutionToBe =
    WORDS[LENGTH_OVERRIDE][index % WORDS[LENGTH_OVERRIDE].length].toUpperCase()

  var loaded = loadUnlimitedStatsFromLocalStorage()
  var loaded_sameLength = loaded?.pastSolutions.filter(checkSameLength)

  if (
    loaded &&
    loaded_sameLength &&
    loaded_sameLength.length === WORDS[LENGTH_OVERRIDE].length
  ) {
    var filtered = loaded.pastSolutions.filter(checkNotSameLength)

    saveUnlimitedStatsToLocalStorage({
      winDistribution: loaded?.winDistribution,
      gamesFailed: loaded?.gamesFailed,
      currentStreak: loaded?.currentStreak,
      bestStreak: loaded?.bestStreak,
      totalGames: loaded?.totalGames,
      successRate: loaded?.successRate,
      pastSolutions: filtered,
    })
  }

  while (
    loadUnlimitedStatsFromLocalStorage()?.pastSolutions.includes(solutionToBe)
  ) {
    index = Math.floor(Math.random() * WORDS[LENGTH_OVERRIDE].length)
    solutionToBe =
      WORDS[LENGTH_OVERRIDE][
        index % WORDS[LENGTH_OVERRIDE].length
      ].toUpperCase()
  }

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
