import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModalUnlimited } from './components/modals/StatsModalUnlimited'
import { SettingsModalInf } from './components/modals/SettingsModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
} from './constants/strings'
import {
  maxChallenges,
  MAX_WORD_LENGTH,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  // findFirstUnusedReveal,
  // getURLBase,
  // LENGTH_OVERRIDE,
} from './lib/words'
import {
  addStatsForCompletedUnlimitedGame,
  loadUnlimitedStats,
} from './lib/stats'
import {
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  loadUnlimitedGameStateFromLocalStorage,
  saveUnlimitedGameStateToLocalStorage,
  getStoredIsDiscordEnabled,
  setStoredIsDiscordEnabled,
  getStoredIsTourneyEnabled,
  setStoredIsTourneyEnabled,
  getStoredIsEUEnabled,
  setStoredIsEUEnabled,
  getStoredIsOCEEnabled,
  setStoredIsOCEEnabled,
  getStoredIsASIAEnabled,
  setStoredIsASIAEnabled,
} from './lib/localStorage'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'
import { Navbar } from './components/navbar/Navbar'

function AppInf() {
  // debug(DAY_INDEX, LENGTH_OVERRIDE)

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [isRevealing, setIsRevealing] = useState(false)
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadUnlimitedGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded) {
      const gameWasWon = loaded.guesses.includes(solution)
      if (gameWasWon) {
        setIsGameWon(true)
      }
      if (loaded.guesses.length === maxChallenges(isHardMode) && !gameWasWon) {
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
        })
      }
      return loaded.guesses
    }
    return []
  })

  const [stats, setStats] = useState(() => loadUnlimitedStats())

  const [isDiscordEnabled, setIsDiscordEnabled] = useState(
    getStoredIsDiscordEnabled()
  )
  const [isTourneyEnabled, setIsTourneyEnabled] = useState(
    getStoredIsTourneyEnabled()
  )
  const [isEUEnabled, setIsEUEnabled] = useState(getStoredIsEUEnabled())
  const [isOCEEnabled, setIsOCEEnabled] = useState(getStoredIsOCEEnabled())
  const [isASIAEnabled, setIsASIAEnabled] = useState(getStoredIsASIAEnabled())

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadUnlimitedGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsSettingsModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length < 3 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const handleDiscordEnabled = (isDiscordEnabled: boolean) => {
    setIsDiscordEnabled(isDiscordEnabled)
    setStoredIsDiscordEnabled(isDiscordEnabled)
  }

  const handleTourneyEnabled = (isTourneyEnabled: boolean) => {
    setIsTourneyEnabled(isTourneyEnabled)
    setStoredIsTourneyEnabled(isTourneyEnabled)
  }

  const handleEUEnabled = (isEUEnabled: boolean) => {
    setIsEUEnabled(isEUEnabled)
    setStoredIsEUEnabled(isEUEnabled)
  }

  const handleOCEEnabled = (isOCEEnabled: boolean) => {
    setIsOCEEnabled(isOCEEnabled)
    setStoredIsOCEEnabled(isOCEEnabled)
  }

  const handleASIAEnabled = (isASIAEnabled: boolean) => {
    setIsASIAEnabled(isASIAEnabled)
    setStoredIsASIAEnabled(isASIAEnabled)
  }

  useEffect(() => {
    saveUnlimitedGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH // LENGTH_OVERRIDE

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH && // LENGTH_OVERRIDE &&
      guesses.length < maxChallenges(isHardMode) &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      // LENGTH_OVERRIDE)) {
      showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess, true)) {
      showErrorAlert(WORD_NOT_FOUND_MESSAGE)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    // if (isHardMode) {
    //   const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
    //   if (firstMissingReveal) {
    //     showErrorAlert(firstMissingReveal)
    //     setCurrentRowClass('jiggle')
    //     return setTimeout(() => {
    //       setCurrentRowClass('')
    //     }, ALERT_TIME_MS)
    //   }
    // }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH) // LENGTH_OVERRIDE)

    const winningWord = isWinningWord(currentGuess)

    if (
      currentGuess.length === MAX_WORD_LENGTH && // LENGTH_OVERRIDE &&
      guesses.length < maxChallenges(isHardMode) &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(
          addStatsForCompletedUnlimitedGame(
            stats,
            guesses.length,
            solution,
            isHardMode
          )
        )
        return setIsGameWon(true)
      }

      if (guesses.length === maxChallenges(isHardMode) - 1) {
        setStats(
          addStatsForCompletedUnlimitedGame(
            stats,
            guesses.length + 1,
            solution,
            isHardMode
          )
        )
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1, //LENGTH_OVERRIDE + 1,
        })
      }
    }
  }

  return (
    <div className="flex h-full flex-col">
      <Navbar
        isInfinite={true}
        dayDisplay={0}
        isDarkMode={isDarkMode}
        setIsInfoModalOpen={() => setIsInfoModalOpen(true)}
        setIsSettingsModalOpen={() => setIsSettingsModalOpen(true)}
        setIsStatsModalOpen={() => setIsStatsModalOpen(true)}
      />
      <Grid
        solution={solution}
        guesses={guesses}
        currentGuess={currentGuess}
        isHard={isHardMode}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
      />
      <div className="h-48"></div>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModalUnlimited
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        solution={solution}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        handleMigrateStatsButton={() => {
          setIsStatsModalOpen(false)
          setIsMigrateStatsModalOpen(true)
        }}
        isHardMode={isHardMode}
        isDarkMode={isDarkMode}
        isHighContrastMode={isHighContrastMode}
        numberOfGuessesMade={guesses.length}
      />
      <MigrateStatsModal
        isOpen={isMigrateStatsModalOpen}
        handleClose={() => setIsMigrateStatsModalOpen(false)}
      />
      <SettingsModalInf
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isHardMode={isHardMode}
        handleHardMode={handleHardMode}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
        isDiscordEnabled={isDiscordEnabled}
        handleDiscordEnabled={handleDiscordEnabled}
        isTourneyEnabled={isTourneyEnabled}
        handleTourneyEnabled={handleTourneyEnabled}
        isEUEnabled={isEUEnabled}
        handleEUEnabled={handleEUEnabled}
        isOCEEnabled={isOCEEnabled}
        handleOCEEnabled={handleOCEEnabled}
        isASIAEnabled={isASIAEnabled}
        handleASIAEnabled={handleASIAEnabled}
      />

      <AlertContainer />
    </div>
  )
}

export default AppInf
