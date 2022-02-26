import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { SMASH_VALID_GUESSES } from '../constants/validGuessesSmash'

import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

function getUrlVars() {
  var parts = window.location.href.split('/');
  console.log(parts)
  var dict = new Map<string, string>();

  parts.forEach((part: string) => {
    if(part.includes('=')) {
      var equals_index = parts.indexOf(part)
      var key = part.substring(0,equals_index)
      dict.set(key,part.substring(equals_index+1))
    }
  })
  return dict;
}

function getUrlParam(parameter: string, defaultvalue: any){
  var urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
      urlparameter = getUrlVars().get(parameter);
      }
  return urlparameter;
}

export function getUrlOverrides() {
  var parts = window.location.href.replace("&","").split('/');
  parts = parts.splice(3)
  console.log(parts)
  var dict = new Map<string, number>();
  dict.set('daily', parseInt(parts[0]))
  // dict.set('max', parseInt(parts[1]))
  return dict
}

const OVERRIDES = getUrlOverrides()
export const DAY_OVERRIDE = OVERRIDES.get('daily')
var max_override = OVERRIDES.get('max')
export const LENGTH_OVERRIDE = (!max_override || max_override < 3 || max_override > 7) ? 5 : max_override

// February 15, 2022 Game Epoch
const epochMs = new Date('February 15, 2022 00:00:00').valueOf()
const msInDay = 86400000
export const THE_USUAL = Math.floor((Date.now() - epochMs) / msInDay)

export const isWordInWordList = (word: string) => {
  return (
    WORDS[LENGTH_OVERRIDE].includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase()) ||
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

export const getWordOfDay = () => {
  var index = getDayIndex()
  if (!index) index = 0
  const nextday = (THE_USUAL + 1) * msInDay + epochMs

  return {
    solution: WORDS[LENGTH_OVERRIDE][index % WORDS[LENGTH_OVERRIDE].length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
