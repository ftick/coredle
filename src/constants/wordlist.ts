import {
  getStoredIs64Enabled,
  getStoredIsBrawlEnabled,
  getStoredIsFlashEnabled,
  getStoredIsMeleeEnabled,
  getStoredIsPMEnabled,
  getStoredIsSm4shEnabled,
  getStoredIsUltEnabled,
} from '../lib/localStorage'
import { WORDS_4 } from './bylength/words-4'
import { WORDS_5 } from './bylength/words-5'
import { WORDS_6 } from './bylength/words-6'
import { WORDS_7 } from './bylength/words-7'
import { WORDS_64 } from './bygame/words_64'
import { WORDS_BASE } from './bygame/words_base'
import { WORDS_BRAWL } from './bygame/words_brawl'
import { WORDS_FLASH } from './bygame/words_flash'
import { WORDS_MELEE } from './bygame/words_melee'
import { WORDS_PM } from './bygame/words_pm'
import { WORDS_SM4SH } from './bygame/words_sm4sh'
import { WORDS_ULT } from './bygame/words_ult'

export const WORDS = [[], [], [], [], WORDS_4, WORDS_5, WORDS_6, WORDS_7]

export function getWordsByGame() {
  var arr = [...WORDS_BASE]

  if (getStoredIs64Enabled()) arr.push(...WORDS_64)
  if (getStoredIsMeleeEnabled()) arr.push(...WORDS_MELEE)
  if (getStoredIsBrawlEnabled()) arr.push(...WORDS_BRAWL)
  if (getStoredIsPMEnabled()) arr.push(...WORDS_PM)
  if (getStoredIsSm4shEnabled()) arr.push(...WORDS_SM4SH)
  if (getStoredIsUltEnabled()) arr.push(...WORDS_ULT)
  if (getStoredIsFlashEnabled()) arr.push(...WORDS_FLASH)

  let uniqueWords = arr.filter((element, index) => {
    return arr.indexOf(element) === index
  })

  return uniqueWords
}
