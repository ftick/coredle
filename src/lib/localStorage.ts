const gameStateKey = 'gameState'
const unlimitedStateKey = 'unlimitedState'
const highContrastKey = 'highContrast'
const sixtyFourKey = 'sixtyFour'
const meleeKey = 'melee'
const brawlKey = 'brawl'
const pmKey = 'pm'
const smash4Key = 'smash4'
const ultKey = 'ult'
const flashKey = 'flash'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export const saveUnlimitedGameStateToLocalStorage = (
  gameState: StoredGameState
) => {
  localStorage.setItem(unlimitedStateKey, JSON.stringify(gameState))
}

export const loadUnlimitedGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(unlimitedStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
  lastAttempted?: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

const unlimitedStatKey = 'unlimitedStats'

export type UnlimitedStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
  pastSolutions: string[]
}

export const saveUnlimitedStatsToLocalStorage = (gameStats: UnlimitedStats) => {
  localStorage.setItem(unlimitedStatKey, JSON.stringify(gameStats))
}

export const loadUnlimitedStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(unlimitedStatKey)
  return stats ? (JSON.parse(stats) as UnlimitedStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}

export const setStoredIs64Enabled = (is64Enabled: boolean) => {
  if (is64Enabled) {
    localStorage.setItem(sixtyFourKey, '1')
  } else {
    localStorage.removeItem(sixtyFourKey)
  }
}

export const getStoredIs64Enabled = () => {
  const is64Enabled = localStorage.getItem(sixtyFourKey)
  return is64Enabled === '1'
}

export const setStoredIsMeleeEnabled = (isMeleeEnabled: boolean) => {
  if (isMeleeEnabled) {
    localStorage.setItem(meleeKey, '1')
  } else {
    localStorage.removeItem(meleeKey)
  }
}

export const getStoredIsMeleeEnabled = () => {
  const isMeleeEnabled = localStorage.getItem(meleeKey)
  return isMeleeEnabled === '1'
}

export const setStoredIsBrawlEnabled = (isBrawlEnabled: boolean) => {
  if (isBrawlEnabled) {
    localStorage.setItem(brawlKey, '1')
  } else {
    localStorage.removeItem(brawlKey)
  }
}

export const getStoredIsBrawlEnabled = () => {
  const isBrawlEnabled = localStorage.getItem(brawlKey)
  return isBrawlEnabled === '1'
}

export const setStoredIsPMEnabled = (isPMEnabled: boolean) => {
  if (isPMEnabled) {
    localStorage.setItem(pmKey, '1')
  } else {
    localStorage.removeItem(pmKey)
  }
}

export const getStoredIsPMEnabled = () => {
  const isPMEnabled = localStorage.getItem(pmKey)
  return isPMEnabled === '1'
}

export const setStoredIsSmash4Enabled = (isSmash4Enabled: boolean) => {
  if (isSmash4Enabled) {
    localStorage.setItem(smash4Key, '1')
  } else {
    localStorage.removeItem(smash4Key)
  }
}

export const getStoredIsSmash4Enabled = () => {
  const isSmash4Enabled = localStorage.getItem(smash4Key)
  return isSmash4Enabled === '1'
}

export const setStoredIsUltEnabled = (isUltEnabled: boolean) => {
  if (isUltEnabled) {
    localStorage.setItem(ultKey, '1')
  } else {
    localStorage.removeItem(ultKey)
  }
}

export const getStoredIsUltEnabled = () => {
  const isUltEnabled = localStorage.getItem(ultKey)
  return isUltEnabled === '1'
}

export const setStoredIsFlashEnabled = (isFlashEnabled: boolean) => {
  if (isFlashEnabled) {
    localStorage.setItem(flashKey, '1')
  } else {
    localStorage.removeItem(flashKey)
  }
}

export const getStoredIsFlashEnabled = () => {
  const isFlashEnabled = localStorage.getItem(flashKey)
  return isFlashEnabled === '1'
}
