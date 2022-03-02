import {
  getStoredIs64Enabled,
  getStoredIsBrawlEnabled,
  getStoredIsFlashEnabled,
  getStoredIsMeleeEnabled,
  getStoredIsPMEnabled,
  getStoredIsSm4shEnabled,
  getStoredIsUltEnabled,
} from '../lib/localStorage'
import { WORDS_4 } from './words-4'
import { WORDS_5 } from './words-5'
import { WORDS_6 } from './words-6'
import { WORDS_7 } from './words-7'
import { WORDS_64 } from './words_64'
import { WORDS_BASE } from './words_base'
import { WORDS_BRAWL } from './words_brawl'
import { WORDS_FLASH } from './words_flash'
import { WORDS_MELEE } from './words_melee'
import { WORDS_PM } from './words_pm'
import { WORDS_SM4SH } from './words_sm4sh'
import { WORDS_ULT } from './words_ult'

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
