import {
  getStoredIsTourneyEnabled,
  getStoredIsDiscordEnabled,
  getStoredIsEUEnabled,
  getStoredIsOCEEnabled,
} from '../lib/localStorage'
import { WORDS_DAILY } from './words_daily'
import { WORDS_BASE } from './bycategory/words_base'
import { WORDS_DISCORD } from './bycategory/words_discord'
import { WORDS_TOURNEY } from './bycategory/words_tourney'
import { WORDS_EU } from './bycategory/words_eu'
import { WORDS_OCE } from './bycategory/words_oce'
import { debuglog } from '../lib/log'

export const WORDS = WORDS_DAILY

export function getWordsByGame(override?: boolean) {
  var arr = [...WORDS_BASE]

  if (override) {
    arr.push(...WORDS_DISCORD)
    arr.push(...WORDS_TOURNEY)
    arr.push(...WORDS_EU)
    arr.push(...WORDS_OCE)
  } else {
    if (getStoredIsDiscordEnabled()) arr.push(...WORDS_DISCORD)
    if (getStoredIsTourneyEnabled()) arr.push(...WORDS_TOURNEY)
    if (getStoredIsEUEnabled()) arr.push(...WORDS_EU)
    if (getStoredIsOCEEnabled()) arr.push(...WORDS_OCE)
  }

  let uniqueWords = arr.filter((element, index) => {
    return arr.indexOf(element) === index
  })

  debuglog(uniqueWords.length, 'unique words')

  return uniqueWords
}
