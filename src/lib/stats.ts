import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  loadUnlimitedStatsFromLocalStorage,
  saveStatsToLocalStorage,
  saveUnlimitedStatsToLocalStorage,
  UnlimitedStats,
} from './localStorage'
import { getDayIndex, THE_USUAL } from './words'

// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  const day_index = getDayIndex()

  // if (day_index === THE_USUAL) {
  if (
    stats.totalGames === 0 ||
    (typeof stats.lastAttempted === 'number' &&
      stats.lastAttempted < day_index) ||
    // (typeof stats.lastAttempted === "number" && stats.lastAttempted < THE_USUAL) ||
    (typeof stats.lastAttempted !== 'number' && day_index === THE_USUAL)
  ) {
    stats.totalGames += 1
    stats.lastAttempted = day_index

    if (count >= MAX_CHALLENGES) {
      // A fail situation
      stats.currentStreak = 0
      stats.gamesFailed += 1
    } else {
      stats.winDistribution[count] += 1
      stats.currentStreak += 1

      if (stats.bestStreak < stats.currentStreak) {
        stats.bestStreak = stats.currentStreak
      }
    }

    stats.successRate = getSuccessRate(stats)

    saveStatsToLocalStorage(stats)
  }
  return stats
}

export const addStatsForCompletedUnlimitedGame = (
  unlimitedStats: UnlimitedStats,
  count: number,
  solution: string
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...unlimitedStats }

  stats.totalGames += 1
  stats.pastSolutions.push(solution)

  if (count >= MAX_CHALLENGES) {
    // A fail situation
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count] += 1
    stats.currentStreak += 1

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getUnlimitedSuccessRate(stats)

  saveUnlimitedStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
  lastAttempted: -1,
}

const defaultUnlimitedStats: UnlimitedStats = {
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
  pastSolutions: [],
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

export const loadUnlimitedStats = () => {
  return loadUnlimitedStatsFromLocalStorage() || defaultUnlimitedStats
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}

const getUnlimitedSuccessRate = (gameStats: UnlimitedStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
