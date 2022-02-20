import { GameStats } from '../../lib/localStorage'
import {
  TOTAL_TRIES_TEXT as TOTAL_EN,
  SUCCESS_RATE_TEXT as SUCCESS_EN,
  CURRENT_STREAK_TEXT as CURRENT_EN,
  BEST_STREAK_TEXT as BEST_EN,
} from '../../constants/strings'
import {
  TOTAL_TRIES_TEXT as TOTAL_FR,
  SUCCESS_RATE_TEXT as SUCCESS_FR,
  CURRENT_STREAK_TEXT as CURRENT_FR,
  BEST_STREAK_TEXT as BEST_FR,
} from '../../constants/strings-fr'

var TOTAL_TRIES = ''
var SUCCESS_RATE = ''
var CURRENT_STREAK = ''
var BEST_STREAK = ''
var userLang = navigator.language

if (userLang.startsWith('en')) {
  TOTAL_TRIES = TOTAL_EN
  SUCCESS_RATE = SUCCESS_EN
  CURRENT_STREAK = CURRENT_EN
  BEST_STREAK = BEST_EN
} else if (userLang.startsWith('fr')) {
  TOTAL_TRIES = TOTAL_FR
  SUCCESS_RATE = SUCCESS_FR
  CURRENT_STREAK = CURRENT_FR
  BEST_STREAK = BEST_FR
}

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  return (
    <div className="flex justify-center my-2">
      <StatItem label={TOTAL_TRIES} value={gameStats.totalGames} />
      <StatItem label={SUCCESS_RATE} value={`${gameStats.successRate}%`} />
      <StatItem label={CURRENT_STREAK} value={gameStats.currentStreak} />
      <StatItem label={BEST_STREAK} value={gameStats.bestStreak} />
    </div>
  )
}
