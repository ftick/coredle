import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
  WITH_LINK_TEXT,
  WITH_WORDS_TEXT,
} from '../../constants/strings'
import { MigrationIntro } from '../stats/MigrationIntro'
import { ENABLE_MIGRATE_STATS } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: string
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleMigrateStatsButton: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
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
        <div className="flex flex-row justify-evenly dark:text-white">
          <div className="flex flex-col justify-center">
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div className="flex">
            <div className="flex flex-row items-center">
              <button
                type="button"
                className="h-3/5 w-half rounded-md border border-transparent shadow-sm px-3 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => {
                  // shareStatus(guesses, isGameLost, isHardMode, false, false)
                  // handleShareToClipboard()
                  shareStatus(
                    solution,
                    guesses,
                    isGameLost,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    false,
                    false,
                    handleShareToClipboard
                  )
                }}
              >
                {SHARE_TEXT}
              </button>
            </div>
          </div>
          <div className="flex">
            <div>
              <div>
                <button
                  type="button"
                  className="mt-2 h-full w-half rounded-md border border-transparent shadow-sm px-3 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    // shareStatus(guesses, isGameLost, isHardMode, true, false)
                    // handleShareToClipboard()
                    shareStatus(
                      solution,
                      guesses,
                      isGameLost,
                      isHardMode,
                      isDarkMode,
                      isHighContrastMode,
                      true,
                      false,
                      handleShareToClipboard
                    )
                  }}
                >
                  {WITH_LINK_TEXT}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="mt-2 w-half rounded-md border border-transparent shadow-sm px-3 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    // shareStatus(guesses, isGameLost, isHardMode, false, true)
                    // handleShareToClipboard()
                    shareStatus(
                      solution,
                      guesses,
                      isGameLost,
                      isHardMode,
                      isDarkMode,
                      isHighContrastMode,
                      false,
                      true,
                      handleShareToClipboard
                    )
                  }}
                >
                  {WITH_WORDS_TEXT}
                </button>
              </div>
            </div>
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
