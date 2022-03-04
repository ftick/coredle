import {
  getStoredIs64Enabled,
  getStoredIsBrawlEnabled,
  getStoredIsFlashEnabled,
  getStoredIsMeleeEnabled,
  getStoredIsPMEnabled,
  getStoredIsSmash4Enabled,
  getStoredIsUltEnabled,
} from '../lib/localStorage'
import { WORDS_DAILY } from './words_daily'
import { WORDS_64 } from './bygame/words_64'
import { WORDS_BASE } from './bygame/words_base'
import { WORDS_BRAWL } from './bygame/words_brawl'
import { WORDS_FLASH } from './bygame/words_flash'
import { WORDS_MELEE } from './bygame/words_melee'
import { WORDS_PM } from './bygame/words_pm'
import { WORDS_SMASH4 } from './bygame/words_smash4'
import { WORDS_ULT } from './bygame/words_ult'

export const WORDS = WORDS_DAILY

export function getWordsByGame(override?: boolean) {
  var arr = [...WORDS_BASE]

  if (override) {
    arr.push(...WORDS_64)
    arr.push(...WORDS_MELEE)
    arr.push(...WORDS_BRAWL)
    arr.push(...WORDS_PM)
    arr.push(...WORDS_SMASH4)
    arr.push(...WORDS_ULT)
    arr.push(...WORDS_FLASH)
  } else {
    if (getStoredIs64Enabled()) arr.push(...WORDS_64)
    if (getStoredIsMeleeEnabled()) arr.push(...WORDS_MELEE)
    if (getStoredIsBrawlEnabled()) arr.push(...WORDS_BRAWL)
    if (getStoredIsPMEnabled()) arr.push(...WORDS_PM)
    if (getStoredIsSmash4Enabled()) arr.push(...WORDS_SMASH4)
    if (getStoredIsUltEnabled()) arr.push(...WORDS_ULT)
    if (getStoredIsFlashEnabled()) arr.push(...WORDS_FLASH)
  }

  let uniqueWords = arr.filter((element, index) => {
    return arr.indexOf(element) === index
  })

  console.log(uniqueWords.length, 'unique words')

  return uniqueWords
}
