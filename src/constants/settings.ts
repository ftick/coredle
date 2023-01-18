import { solution } from '../lib/words'

export const MAX_WORD_LENGTH = solution.length
export const MAX_CHALLENGES = Math.min(
  Math.max(0, Math.abs(MAX_WORD_LENGTH - 6) - 1) + 8,
  9
)
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const GAME_LOST_INFO_DELAY = (MAX_WORD_LENGTH + 1) * REVEAL_TIME_MS
export const WELCOME_INFO_MODAL_MS = 350
export const DEBUG_ENABLED = true
export const DISCOURAGE_INAPP_BROWSERS = true
export const ENABLE_MIGRATE_STATS = true
export const BLOWFISH_KEY = 'jIEXqS7f%bYm#JiutG9Eu@2$mnjTpu'
export const BLOWFISH_IV = 'sSd9EI@o'

// 3, 2 -> 9
// 4, 1 -> 9
// 5, 0 -> 8
// 6, 0 -> 8
// 7, 0 -> 8
// 8, 1 -> 9
// 9, 2 -> 9
