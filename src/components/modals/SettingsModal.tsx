import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

import {
  HARD_MODE_TEXT as HARD_EN,
  DARK_MODE_TEXT as DARK_EN,
  CONTRAST_MODE_TEXT as CONTRAST_EN,
  SETTINGS_TEXT as SETTNGS_EN,
  HARD_MODE_DESCRIPTION,
  CONTRAST_MODE_DESCRIPTION,
} from '../../constants/strings'

import {
  HARD_MODE_TEXT as HARD_FR,
  DARK_MODE_TEXT as DARK_FR,
  CONTRAST_MODE_TEXT as CONTRAST_FR,
  SETTINGS_TEXT as SETTNGS_FR,
} from '../../constants/strings-fr'
import { CheckIcon, TrashIcon } from '@heroicons/react/outline'

var HARD_MODE = ''
var DARK_MODE = ''
var CONTRAST_MODE = ''
var SETTINGS_TITLE = ''

var userLang = navigator.language

if (userLang.startsWith('en')) {
  HARD_MODE = HARD_EN
  DARK_MODE = DARK_EN
  CONTRAST_MODE = CONTRAST_EN
  SETTINGS_TITLE = SETTNGS_EN
} else if (userLang.startsWith('fr')) {
  HARD_MODE = HARD_FR
  DARK_MODE = DARK_FR
  CONTRAST_MODE = CONTRAST_FR
  SETTINGS_TITLE = SETTNGS_FR
}

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
}

type PropsInf = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  isTourneyEnabled: boolean
  handleTourneyEnabled: Function
  isCostcoEnabled: boolean
  handleCostcoEnabled: Function
  isDiscordEnabled: boolean
  handleDiscordEnabled: Function
  isEUEnabled: boolean
  handleEUEnabled: Function
  isOCEEnabled: boolean
  handleOCEEnabled: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: Props) => {
  return (
    <BaseModal title={SETTINGS_TITLE} isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4 divide-y">
        <SettingsToggle
          settingName={HARD_MODE}
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName={DARK_MODE}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName={CONTRAST_MODE}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={CONTRAST_MODE_DESCRIPTION}
        />
        <TrashIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => {
            localStorage.removeItem('gameState')
            localStorage.removeItem('gameStats')
            window.location.reload()
          }}
        />
      </div>
    </BaseModal>
  )
}

export const SettingsModalInf = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isDiscordEnabled,
  handleDiscordEnabled,
  isTourneyEnabled,
  handleTourneyEnabled,
  isCostcoEnabled,
  handleCostcoEnabled,
  isEUEnabled,
  handleEUEnabled,
  isOCEEnabled,
  handleOCEEnabled,
}: PropsInf) => {
  return (
    <BaseModal title={SETTINGS_TITLE} isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4 divide-y">
        <SettingsToggle
          settingName={HARD_MODE}
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName={DARK_MODE}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName={CONTRAST_MODE}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={CONTRAST_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName={'Main Discord'}
          flag={isDiscordEnabled}
          handleFlag={handleDiscordEnabled}
        />
        <SettingsToggle
          settingName={'Tourneys'}
          flag={isTourneyEnabled}
          handleFlag={handleTourneyEnabled}
        />
        <SettingsToggle
          settingName={'Costco'}
          flag={isCostcoEnabled}
          handleFlag={handleCostcoEnabled}
        />
        <SettingsToggle
          settingName={'EU'}
          flag={isEUEnabled}
          handleFlag={handleEUEnabled}
        />
        <SettingsToggle
          settingName={'OCE'}
          flag={isOCEEnabled}
          handleFlag={handleOCEEnabled}
        />
        <div className="grid-cols-2 gap-4 flex flex-row">
          <TrashIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => {
              localStorage.removeItem('unlimitedState')
              localStorage.removeItem('unlimitedStats')
              localStorage.removeItem('sixtyfour')
              localStorage.removeItem('Tourney')
              localStorage.removeItem('brawl')
              localStorage.removeItem('flash')
              localStorage.removeItem('pm')
              localStorage.removeItem('smash4')
              localStorage.removeItem('ult')
              // localStorage.clear()
              window.location.reload()
            }}
          />
          <CheckIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => {
              window.location.reload()
            }}
          />
        </div>
      </div>
    </BaseModal>
  )
}
