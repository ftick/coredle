import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

import {
  HARD_MODE_TEXT as HARD_EN,
  DARK_MODE_TEXT as DARK_EN,
  CONTRAST_MODE_TEXT as CONTRAST_EN,
  SETTINGS_TEXT as SETTNGS_EN,
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
  is64Enabled: boolean
  handle64Enabled: Function
  isMeleeEnabled: boolean
  handleMeleeEnabled: Function
  isBrawlEnabled: boolean
  handleBrawlEnabled: Function
  isPMEnabled: boolean
  handlePMEnabled: Function
  isUltEnabled: boolean
  handleUltEnabled: Function
  isSm4shEnabled: boolean
  handleSm4shEnabled: Function
  isFlashEnabled: boolean
  handleFlashEnabled: Function
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
      <div className="grid-cols-2 gap-4">
        <SettingsToggle
          settingName={HARD_MODE}
          flag={isHardMode}
          handleFlag={handleHardMode}
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
        />
        <TrashIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => {
            localStorage.clear()
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
  is64Enabled,
  handle64Enabled,
  isMeleeEnabled,
  handleMeleeEnabled,
  isBrawlEnabled,
  handleBrawlEnabled,
  isPMEnabled,
  handlePMEnabled,
  isSm4shEnabled,
  handleSm4shEnabled,
  isUltEnabled,
  handleUltEnabled,
  isFlashEnabled,
  handleFlashEnabled,
}: PropsInf) => {
  return (
    <BaseModal title={SETTINGS_TITLE} isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
        <SettingsToggle
          settingName={HARD_MODE}
          flag={isHardMode}
          handleFlag={handleHardMode}
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
        />
        <SettingsToggle
          settingName={'64 Words'}
          flag={is64Enabled}
          handleFlag={handle64Enabled}
        />
        <SettingsToggle
          settingName={'Melee Words'}
          flag={isMeleeEnabled}
          handleFlag={handleMeleeEnabled}
        />
        <SettingsToggle
          settingName={'Brawl Words'}
          flag={isBrawlEnabled}
          handleFlag={handleBrawlEnabled}
        />
        <SettingsToggle
          settingName={'Project M Words'}
          flag={isPMEnabled}
          handleFlag={handlePMEnabled}
        />
        <SettingsToggle
          settingName={'Smash 4 Words'}
          flag={isSm4shEnabled}
          handleFlag={handleSm4shEnabled}
        />
        <SettingsToggle
          settingName={'Ultimate Words'}
          flag={isUltEnabled}
          handleFlag={handleUltEnabled}
        />
        <SettingsToggle
          settingName={'SSF2 Words'}
          flag={isFlashEnabled}
          handleFlag={handleFlashEnabled}
        />
        <div className="grid-cols-2 gap-4 flex flex-row">
          <TrashIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => {
              localStorage.clear()
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
