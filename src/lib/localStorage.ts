const gameStateKey = 'gameState'
const unlimitedStateKey = 'unlimitedState'
const highContrastKey = 'highContrast'
const tourneyKey = 'tourney'
const costcoKey = 'costco'
const staffKey = 'staff'
const slangKey = 'slang'
const naKey = 'na'
const euKey = 'eu'
const oceKey = 'oce'

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

export const setStoredIsTourneyEnabled = (isTourneyEnabled: boolean) => {
  if (isTourneyEnabled) {
    localStorage.setItem(tourneyKey, '1')
  } else {
    localStorage.removeItem(tourneyKey)
  }
}

export const getStoredIsTourneyEnabled = () => {
  const isTourneyEnabled = localStorage.getItem(tourneyKey)
  return isTourneyEnabled === '1'
}

export const setStoredIsCostcoEnabled = (isCostcoEnabled: boolean) => {
  if (isCostcoEnabled) {
    localStorage.setItem(costcoKey, '1')
  } else {
    localStorage.removeItem(costcoKey)
  }
}

export const getStoredIsCostcoEnabled = () => {
  const isCostcoEnabled = localStorage.getItem(costcoKey)
  return isCostcoEnabled === '1'
}

export const setStoredIsNAEnabled = (isNAEnabled: boolean) => {
  if (isNAEnabled) {
    localStorage.setItem(naKey, '1')
  } else {
    localStorage.removeItem(naKey)
  }
}

export const getStoredIsNAEnabled = () => {
  const isNAEnabled = localStorage.getItem(naKey)
  return isNAEnabled === '1'
}

export const setStoredIsSlangEnabled = (isSlangEnabled: boolean) => {
  if (isSlangEnabled) {
    localStorage.setItem(slangKey, '1')
  } else {
    localStorage.removeItem(slangKey)
  }
}

export const getStoredIsSlangEnabled = () => {
  const isSlangEnabled = localStorage.getItem(slangKey)
  return isSlangEnabled === '1'
}

export const setStoredIsDiscordEnabled = (isDiscordEnabled: boolean) => {
  if (isDiscordEnabled) {
    localStorage.setItem(staffKey, '1')
  } else {
    localStorage.removeItem(staffKey)
  }
}

export const getStoredIsDiscordEnabled = () => {
  const isDiscordEnabled = localStorage.getItem(staffKey)
  return isDiscordEnabled === '1'
}

export const setStoredIsEUEnabled = (isEUEnabled: boolean) => {
  if (isEUEnabled) {
    localStorage.setItem(euKey, '1')
  } else {
    localStorage.removeItem(euKey)
  }
}

export const getStoredIsEUEnabled = () => {
  const isEUEnabled = localStorage.getItem(euKey)
  return isEUEnabled === '1'
}

export const setStoredIsOCEEnabled = (isOCEEnabled: boolean) => {
  if (isOCEEnabled) {
    localStorage.setItem(oceKey, '1')
  } else {
    localStorage.removeItem(oceKey)
  }
}

export const getStoredIsOCEEnabled = () => {
  const isOCEEnabled = localStorage.getItem(oceKey)
  return isOCEEnabled === '1'
}
