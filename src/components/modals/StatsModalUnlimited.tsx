import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { UnlimitedStats } from '../../lib/localStorage'
import { shareStatusInf } from '../../lib/share'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEXT_WORD_TEXT,
  SHARE_TEXT,
  WITH_LINK_TEXT,
} from '../../constants/strings'
import { MigrationIntro } from '../stats/MigrationIntro'
import { ENABLE_MIGRATE_STATS } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: string
  guesses: string[]
  gameStats: UnlimitedStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleMigrateStatsButton: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModalUnlimited = ({
  isOpen,
  handleClose,
  solution,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleMigrateStatsButton,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-0 columns-2 dark:text-white">
          <div className="flex justify-between">
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-3 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                window.location.reload()
              }}
            >
              {NEXT_WORD_TEXT}
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="mt-2 w-half rounded-md border border-transparent shadow-sm px-3 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                // shareStatusInf(guesses, isGameLost, isHardMode, false)
                // handleShare()
                shareStatusInf(
                  solution,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  false,
                  handleShareToClipboard
                )
              }}
            >
              {SHARE_TEXT}
            </button>
            <button
              type="button"
              className="mt-2 w-half rounded-md border border-transparent shadow-sm px-3 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                // shareStatusInf(guesses, isGameLost, isHardMode, true)
                // handleShare()
                shareStatusInf(
                  solution,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  true,
                  handleShareToClipboard
                )
              }}
            >
              {WITH_LINK_TEXT}
            </button>
          </div>
        </div>
      )}
      {ENABLE_MIGRATE_STATS && (
        <div>
          <hr className="mt-4 -mb-4 border-gray-500" />
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        </div>
      )}
    </BaseModal>
  )
}
