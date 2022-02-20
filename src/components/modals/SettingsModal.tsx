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

var userLang = navigator.language;

var HARD_MODE = ''
var DARK_MODE = ''
var CONTRAST_MODE = ''
var SETTINGS_TITLE = ''

if (userLang.startsWith('en')) {
  HARD_MODE = HARD_EN
  DARK_MODE = DARK_EN
  CONTRAST_MODE = CONTRAST_EN
  SETTINGS_TITLE = SETTNGS_EN
} else if(userLang.startsWith('fr')) {
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
      </div>
    </BaseModal>
  )
}
