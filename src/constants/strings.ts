export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!
// export const GAME_URL = 'https://coredle.vercel.app'
export const GAME_URL = 'https://coredle.kuyachi.xyz'

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Word not found'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The coredle was ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const SETTINGS_TEXT = 'Settings'
export const HARD_MODE_TEXT = 'Hard Mode'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const DARK_MODE_TEXT = 'Dark Mode'
export const CONTRAST_MODE_TEXT = 'High Contrast Mode'
export const CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New word in'
export const NEXT_WORD_TEXT = 'Next'
export const SHARE_TEXT = 'Share'
export const WITH_LINK_TEXT = 'w/ Link'
export const WITH_WORDS_TEXT = 'w/ Words'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const MIGRATE_BUTTON_TEXT = 'Transfer'
export const MIGRATE_DESCRIPTION_TEXT =
  'Click here to transfer your statistics to a new device.'
export const MIGRATE_WARNING_TEXT =
  'Are you sure you want to override the statistics on this device? This action is not reversable.'
export const RELOAD_TEXT = 'The site will now reload.'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser."

export const HOW_TO0_TEXT = 'How to Play'
export const HOW_TO1_TEXT =
  'Guess the word in 8-9 tries. After each guess, the color of the tiles will change to show how close your guess was to the answer.'
export const HOW_TO2_TEXT =
  'The letter B is in this word and in the correct spot.'
export const HOW_TO3_TEXT =
  'The letter I is in this word but in the wrong spot.'
export const HOW_TO4_TEXT = 'The number 7 is not in this word in any spot.'

export const HOW_TO5_TEXT = `This is Wordle using words related to Omega Strikers and its competitive scene, ft. players, tournaments, slang, arenas, characters, you name it.`
export const HOW_TO5B_TEXT =
  'Please refresh the page every Monday @ 3PM EST to ensure your daily words are properly synced.'
export const HOW_TO6_TEXT = 'contact me'
export const HOW_TO7_TEXT = 'source code'
export const HOW_TO8_TEXT = 'forked from Reactle'
